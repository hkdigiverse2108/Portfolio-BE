import bcryptjs from "bcryptjs";
import { apiResponse, generateHash, generateToken, getOtpExpireTime, getUniqueOtp, HTTP_STATUS } from "../../common";
import { userModel } from "../../database";
import { createOne, emailVerificationMail, getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { IForgotPasswordValidate, ILoginValidate, IRegisterValidate, IResendOtpValidate, IResetPasswordValidate, IUpdatePasswordValidate, IVerifyOtpValidate } from "../../type";
import { forgotPasswordSchema, loginSchema, registerSchema, resendOtpSchema, resetPasswordSchema, updatePasswordSchema, verifyOtpSchema } from "../../validation";

export const register = async (req, res) => {
  reqInfo(req);
  try {
    const { error, value }: IRegisterValidate = registerSchema.validate(req.body);

    if (error) return res.status(HTTP_STATUS.BAD_GATEWAY).json(new apiResponse(HTTP_STATUS.BAD_GATEWAY, error?.details[0]?.message, {}, {}));

    let criteria = { $or: [] };
    if (value?.email) criteria.$or.push({ email: value?.email });

    let existingUser = await getFirstMatch(userModel, criteria, {}, {});
    if (existingUser) {
      if (existingUser?.email === value?.email) return res.status(HTTP_STATUS.CONFLICT).json(new apiResponse(HTTP_STATUS.CONFLICT, responseMessage?.dataAlreadyExist("Email"), {}, {}));
      return res.status(HTTP_STATUS.CONFLICT).json(new apiResponse(HTTP_STATUS.CONFLICT, responseMessage?.dataAlreadyExist("User"), {}, {}));
    }

    value.password = await generateHash(value.password);

    let response = await createOne(userModel, value);
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.addDataError, {}, {}));

    const token = await generateToken({ _id: response?._id, status: "register", generatedOn: new Date().getTime() }, { expiresIn: "24h" });
    delete response.password;
    response.token = token;

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.signupSuccess, response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage?.internalServerError, {}, error));
  }
};

export const login = async (req, res) => {
  reqInfo(req);
  try {
    const { error, value }: ILoginValidate = loginSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_GATEWAY).json(new apiResponse(HTTP_STATUS.BAD_GATEWAY, error?.details[0]?.message, {}, {}));

    let response = await getFirstMatch(userModel, { email: value?.email, isDeleted: false }, {}, {});

    if (!response) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.invalidUserPasswordEmail, {}, {}));
    const comparePassword = await bcryptjs.compare(value?.password, response?.password);
    if (!comparePassword) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.invalidUserPasswordEmail, {}, {}));

    if (response?.isActive === false) return res.status(HTTP_STATUS.FORBIDDEN).json(new apiResponse(HTTP_STATUS.FORBIDDEN, responseMessage?.accountBlock, {}, {}));

    // OTP Generation
    const otp = await getUniqueOtp();
    if (response?.email) emailVerificationMail(response, otp);
    const otpExpireTime = getOtpExpireTime();
    await userModel.findOneAndUpdate({ _id: response?._id }, { otp, otpExpireTime }, { returnDocument: "after" });

    const token = await generateToken({ _id: response?._id, status: "login", generatedOn: new Date().getTime() }, { expiresIn: "24h" });
    delete response.password;
    response.token = token;

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.loginSuccess, response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage?.internalServerError, {}, error));
  }
};

export const forgotPassword = async (req, res) => {
  reqInfo(req);
  try {
    const { error, value }: IForgotPasswordValidate = forgotPasswordSchema.validate(req.body);

    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    let response = await getFirstMatch(userModel, { email: value?.email, isDeleted: false }, {}, {});
    if (!response) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.getDataNotFound("User"), {}, {}));
    if (response?.isActive === false) return res.status(HTTP_STATUS.FORBIDDEN).json(new apiResponse(HTTP_STATUS.FORBIDDEN, responseMessage?.accountBlock, {}, {}));

    const otp = await getUniqueOtp();
    const otpExpireTime = getOtpExpireTime();

    if (response?.email) emailVerificationMail(response, otp);

    response = await updateData(userModel, { _id: response?._id }, { otp, otpExpireTime }, {});

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.resendOtpSuccess, {}, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage?.internalServerError, {}, error));
  }
};

export const updatePassword = async (req, res) => {
  reqInfo(req);
  try {
    const { error, value }: IUpdatePasswordValidate = updatePasswordSchema.validate(req.body);

    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));
    if (value.newPassword !== value.confirmPassword) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.customMessage("Password do not match."), {}, {}));

    let response = await getFirstMatch(userModel, { email: value?.email, isDeleted: false }, {}, {});
    if (!response) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.getDataNotFound("User"), {}, {}));
    if (response?.isActive === false) return res.status(HTTP_STATUS.FORBIDDEN).json(new apiResponse(HTTP_STATUS.FORBIDDEN, responseMessage?.accountBlock, {}, {}));

    const hashPassword = await generateHash(value?.newPassword);

    await updateData(userModel, { _id: response?._id }, { password: hashPassword, otp: null, otpExpireTime: null }, {});

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.resetPasswordSuccess, {}, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage?.internalServerError, {}, {}));
  }
};

export const resetPassword = async (req, res) => {
  reqInfo(req);
  try {
    const { error, value }: IResetPasswordValidate = resetPasswordSchema.validate(req.body);

    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));
    if (value.newPassword !== value.confirmPassword) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.customMessage("Password do not match."), {}, {}));

    let response = await getFirstMatch(userModel, { email: value?.email, isDeleted: false }, {}, {});
    if (!response) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.getDataNotFound("User"), {}, {}));
    if (response?.isActive === false) return res.status(HTTP_STATUS.FORBIDDEN).json(new apiResponse(HTTP_STATUS.FORBIDDEN, responseMessage?.accountBlock, {}, {}));
    if (value?.oldPassword === value?.newPassword) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.passwordSameError, {}, {}));

    const comparePassword = await bcryptjs.compare(value?.oldPassword, response?.password);
    if (!comparePassword) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.invalidUserPasswordEmail, {}, {}));

    const hashPassword = await generateHash(value?.newPassword);

    await updateData(userModel, { _id: response?._id }, { password: hashPassword }, {});

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.resetPasswordSuccess, {}, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage?.internalServerError, {}, {}));
  }
};

export const verifyOtp = async (req, res) => {
  reqInfo(req);
  try {
    const { error, value }: IVerifyOtpValidate = verifyOtpSchema.validate(req.body);

    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    let response = await getFirstMatch(userModel, { email: value?.email, isDeleted: false }, {}, {});
    if (!response) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.getDataNotFound("User"), {}, {}));
    if (response?.isActive === false) return res.status(HTTP_STATUS.FORBIDDEN).json(new apiResponse(HTTP_STATUS.FORBIDDEN, responseMessage?.accountBlock, {}, {}));

    if (Number(response?.otp) !== Number(value?.otp)) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.invalidOTP, {}, {}));

    if (response?.otpExpireTime < new Date()) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.expireOTP, {}, {}));

    ["password", "otp", "otpExpireTime"].forEach((key) => delete response[key]);

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.OTPVerified, response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage?.internalServerError, {}, {}));
  }
};

export const resendOtp = async (req, res) => {
  reqInfo(req);
  try {
    const { error, value }: IResendOtpValidate = resendOtpSchema.validate(req.body);

    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    let response = await getFirstMatch(userModel, { email: value?.email, isDeleted: false }, {}, {});
    if (!response) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, responseMessage?.getDataNotFound("User"), {}, {}));

    if (response?.isActive === false) return res.status(HTTP_STATUS.FORBIDDEN).json(new apiResponse(HTTP_STATUS.FORBIDDEN, responseMessage?.accountBlock, {}, {}));

    const otp = await getUniqueOtp();
    const otpExpireTime = getOtpExpireTime();

    if (response?.email) emailVerificationMail(response, otp);

    response = await updateData(userModel, { _id: response?._id }, { otp, otpExpireTime }, {});

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.resendOtpSuccess, {}, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage?.internalServerError, {}, {}));
  }
};