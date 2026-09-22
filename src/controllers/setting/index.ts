import { apiResponse, HTTP_STATUS } from "../../common";
import { settingModel } from "../../database";
import { getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { ISettingValidate } from "../../type";
import { updateSettingSchema } from "../../validation/setting";

export const updateSetting = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: ISettingValidate = await updateSettingSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    const updatePayload: any = {};
    if (value.bookMeeting !== undefined) updatePayload.bookMeeting = value.bookMeeting;
    if (value.razorpay !== undefined) updatePayload.razorpay = value.razorpay;
    if (user?._id) {
      updatePayload.updatedBy = user._id;
      updatePayload.createdBy = user._id;
    }

    let response = await settingModel.findOneAndUpdate(
      { isDeleted: false },
      { $set: updatePayload },
      { new: true, upsert: true }
    );
    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.updateDataSuccess("Setting"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const getSetting = async (req, res) => {
  reqInfo(req);
  try {
    const response = await getFirstMatch(settingModel, { isDeleted: false }, {}, {});
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.getDataNotFound("Setting"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("Setting"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};
