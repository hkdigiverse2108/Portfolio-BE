import { apiResponse, HTTP_STATUS } from "../../common";
import { userModel } from "../../database";
import { getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { IUserValidate } from "../../type";
import { updateUserSchema } from "../../validation";

export const updateUserSection = async (req, res) => {
  reqInfo(req);
  let { user } = req.headers;
  try {
    const { error, value }: IUserValidate = await updateUserSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    value.createdBy = user?._id;
    value.updatedBy = user?._id;

    let userdata = await updateData(userModel, { _id: user?._id, isDeleted: false }, value, { upsert: true });
    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.updateDataSuccess("User"), userdata, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const getUserSection = async (req, res) => {
  reqInfo(req);
  try {
    let userdata = await getFirstMatch(userModel, { isDeleted: false }, {}, {});
    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("User"), userdata, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};
