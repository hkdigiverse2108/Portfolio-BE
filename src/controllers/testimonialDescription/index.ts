import { apiResponse, HTTP_STATUS } from "../../common";
import { testimonialDescriptionModel } from "../../database";
import { getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { ITestimonialDescriptionValidate } from "../../type";
import { updateTestimonialDescriptionSchema } from "../../validation";

export const updateTestimonialDescription = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: ITestimonialDescriptionValidate = updateTestimonialDescriptionSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    value.createdBy = user?._id;
    value.updatedBy = user?._id;

    const response = await updateData(testimonialDescriptionModel, { isDeleted: false }, value, { upsert: true });
    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.updateDataSuccess("Testimonial description"), response, {}));
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const getTestimonialDescription = async (req, res) => {
  reqInfo(req);
  try {
    const response = await getFirstMatch(testimonialDescriptionModel, { isDeleted: false }, {}, {});
    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("Testimonial description"), response, {}));
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};
