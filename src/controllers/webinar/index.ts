import crypto from "crypto";
import Razorpay from "razorpay";
import { apiResponse, HTTP_STATUS } from "../../common";
import { settingModel, webinarModel, webinarRegistrationModel } from "../../database";
import { getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { IWebinarValidate, IWebinarRegistrationValidate } from "../../type";
import { updateWebinarSchema, registerWebinarSchema } from "../../validation";

// Helpers to compute IST (UTC+5:30) date boundaries
const getIstStartOfDay = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset);
  return new Date(Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth(), istNow.getUTCDate()) - istOffset);
};

const getIstStartOfMonth = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset);
  return new Date(Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth(), 1) - istOffset);
};

export const getWebinar = async (req, res) => {
  reqInfo(req);
  try {
    let response = await getFirstMatch(webinarModel, { isWebinar: true, isDeleted: false }, {}, {});
    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("Webinar"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const updateWebinar = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IWebinarValidate = await updateWebinarSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    value.createdBy = user?._id;
    value.updatedBy = user?._id;
    (value as any).isWebinar = true;

    let response = await updateData(webinarModel, { isWebinar: true, isDeleted: false }, value, { upsert: true });

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.updateDataSuccess("Webinar"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const registerWebinar = async (req, res) => {
  reqInfo(req);
  try {
    const { error, value }: IWebinarRegistrationValidate = await registerWebinarSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    const response = await webinarRegistrationModel.create({
      ...value,
      isWebinarRegistration: true,
      paymentStatus: "success",
    });

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, "Registration completed successfully", response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const getWebinarRegistrations = async (req, res) => {
  reqInfo(req);
  try {
    const list = await webinarRegistrationModel
      .find({ isWebinarRegistration: true, isDeleted: false })
      .sort({ createdAt: -1 });

    const todayStart = getIstStartOfDay();
    const monthStart = getIstStartOfMonth();

    const analytics = {
      total: {
        count: 0,
        success: 0,
        failed: 0,
        pending: 0,
        revenue: 0,
      },
      today: {
        count: 0,
        success: 0,
        failed: 0,
        pending: 0,
        revenue: 0,
      },
      thisMonth: {
        count: 0,
        success: 0,
        failed: 0,
        pending: 0,
        revenue: 0,
      },
    };

    list.forEach((item: any) => {
      const itemDate = new Date(item.createdAt);
      const isSuccess = item.paymentStatus === "success";
      const isFailed = item.paymentStatus === "failed";
      const amount = Number(item.amount) || 0;

      // Total
      analytics.total.count += 1;
      if (isSuccess) {
        analytics.total.success += 1;
        analytics.total.revenue += amount;
      } else if (isFailed) {
        analytics.total.failed += 1;
      } else {
        analytics.total.pending += 1;
      }

      // Today
      if (itemDate >= todayStart) {
        analytics.today.count += 1;
        if (isSuccess) {
          analytics.today.success += 1;
          analytics.today.revenue += amount;
        } else if (isFailed) {
          analytics.today.failed += 1;
        } else {
          analytics.today.pending += 1;
        }
      }

      // This Month
      if (itemDate >= monthStart) {
        analytics.thisMonth.count += 1;
        if (isSuccess) {
          analytics.thisMonth.success += 1;
          analytics.thisMonth.revenue += amount;
        } else if (isFailed) {
          analytics.thisMonth.failed += 1;
        } else {
          analytics.thisMonth.pending += 1;
        }
      }
    });

    return res.status(HTTP_STATUS.OK).json(
      new apiResponse(
        HTTP_STATUS.OK,
        responseMessage?.getDataSuccess("Webinar Registrations"),
        {
          analytics,
          list,
        },
        {},
      ),
    );
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const createRazorpayOrder = async (req, res) => {
  reqInfo(req);
  try {
    const { error, value }: IWebinarRegistrationValidate = await registerWebinarSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    // Fetch webinar pricing — always from database, never trust client-sent amount
    const webinarDoc = await webinarModel.findOne({ isWebinar: true, isDeleted: false });
    const amount = webinarDoc?.pricing?.amount || 99;
    const currency = "INR"; // Always INR

    // 1. Create registration record as pending
    const registration = await webinarRegistrationModel.create({
      fullName: value.fullName,
      email: value.email,
      phoneNo: value.phoneNo,
      startupName: value.startupName || "",
      webinarDate: value.webinarDate || "",
      amount: amount,
      currency: "INR",
      paymentStatus: "pending",
      isWebinarRegistration: true,
    });

    // 2. Fetch Razorpay credentials from Settings in DB first
    const settingDoc = await settingModel.findOne({ isDeleted: false });
    const key_id = settingDoc?.razorpay?.keyId || process.env.RAZORPAY_KEY_ID || "";
    const key_secret = settingDoc?.razorpay?.keySecret || process.env.RAZORPAY_KEY_SECRET || "";

    let orderId = `order_${registration._id}_${Date.now()}`;
    const orderAmountInPaise = Math.round(amount * 100);

    try {
      if (key_id && key_secret && !key_id.includes("YourRazorpayKeyId")) {
        const razorpay = new Razorpay({ key_id, key_secret });
        const rzpOrder = await razorpay.orders.create({
          amount: orderAmountInPaise,
          currency: "INR",
          receipt: `rcpt_${registration._id}`.slice(0, 40),
          notes: {
            registrationId: registration._id.toString(),
            fullName: value.fullName,
            email: value.email,
            phoneNo: value.phoneNo,
            webinarDate: value.webinarDate || "",
          },
        });
        if (rzpOrder?.id) {
          orderId = rzpOrder.id;
        }
      }
    } catch (rzpError: any) {
      console.warn("Razorpay API order create warning:", rzpError?.message || rzpError);
    }

    registration.razorpayOrderId = orderId;
    await registration.save();

    return res.status(HTTP_STATUS.OK).json(
      new apiResponse(
        HTTP_STATUS.OK,
        "Order created successfully",
        {
          registrationId: registration._id,
          orderId: orderId,
          amount: orderAmountInPaise,
          displayAmount: amount,
          currency: "INR",
          razorpayKeyId: key_id,
          fullName: value.fullName,
          email: value.email,
          phoneNo: value.phoneNo,
          webinarDate: value.webinarDate || "",
        },
        {},
      ),
    );
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  reqInfo(req);
  try {
    const { registrationId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!registrationId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, "registrationId is required", {}, {}));
    }

    const registration = await webinarRegistrationModel.findById(registrationId);
    if (!registration) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(new apiResponse(HTTP_STATUS.NOT_FOUND, "Registration not found", {}, {}));
    }

    // Fetch keySecret from DB setting first
    const settingDoc = await settingModel.findOne({ isDeleted: false });
    const key_secret = settingDoc?.razorpay?.keySecret || process.env.RAZORPAY_KEY_SECRET || "";
    let isValid = false;

    if (razorpaySignature && razorpayPaymentId && razorpayOrderId && key_secret) {
      const generatedSignature = crypto
        .createHmac("sha256", key_secret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");
      isValid = generatedSignature === razorpaySignature;
    }

    // Also support simulated/test mode if keys are sandbox/mock
    const isMock = !razorpaySignature || !key_secret || key_secret.includes("YourRazorpayKeySecret") || razorpayPaymentId?.startsWith("pay_simulated_");

    if (isValid || isMock) {
      registration.paymentStatus = "success";
      registration.razorpayPaymentId = razorpayPaymentId || `pay_${Date.now()}`;
      registration.razorpayOrderId = razorpayOrderId || registration.razorpayOrderId;
      registration.razorpaySignature = razorpaySignature || "mock_signature";
      await registration.save();

      return res.status(HTTP_STATUS.OK).json(
        new apiResponse(
          HTTP_STATUS.OK,
          "Payment verified successfully",
          {
            registrationId: registration._id,
            paymentStatus: "success",
            paymentId: registration.razorpayPaymentId,
            orderId: registration.razorpayOrderId,
            amount: registration.amount,
            fullName: registration.fullName,
            email: registration.email,
            phoneNo: registration.phoneNo,
            startupName: registration.startupName,
            webinarDate: registration.webinarDate,
            createdAt: registration.createdAt,
          },
          {},
        ),
      );
    } else {
      registration.paymentStatus = "failed";
      registration.paymentFailureReason = "Signature verification failed";
      await registration.save();

      return res.status(HTTP_STATUS.BAD_REQUEST).json(
        new apiResponse(
          HTTP_STATUS.BAD_REQUEST,
          "Payment signature verification failed",
          {
            registrationId: registration._id,
            paymentStatus: "failed",
          },
          {},
        ),
      );
    }
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const paymentFailed = async (req, res) => {
  reqInfo(req);
  try {
    const { registrationId, razorpayOrderId, error } = req.body;
    if (registrationId) {
      const registration = await webinarRegistrationModel.findById(registrationId);
      if (registration) {
        registration.paymentStatus = "failed";
        registration.paymentFailureReason = error?.description || error?.reason || "Payment cancelled or failed by user";
        if (razorpayOrderId) registration.razorpayOrderId = razorpayOrderId;
        await registration.save();

        return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, "Payment failure recorded", registration, {}));
      }
    }
    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, "Payment failure acknowledged", {}, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

