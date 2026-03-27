import { apiResponse, HTTP_STATUS } from "../../common";
import { ourServiceModel, serviceModel } from "../../database";
import { checkIdExist, countData, createOne, findAllAndPopulate, getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { ICommonIdValidate, IOurServiceValidate } from "../../type";
import { addOurServiceSchema, commonIdSchema, editOurServiceSchema } from "../../validation";

const ObjectId = require("mongoose").Types.ObjectId;

export const addOurService = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IOurServiceValidate = addOurServiceSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    const isPriorityExisting = await getFirstMatch(ourServiceModel, { priority: value.priority, isDeleted: false }, {}, {});
    if (isPriorityExisting) return res.status(HTTP_STATUS.CONFLICT).json(new apiResponse(HTTP_STATUS.CONFLICT, responseMessage?.dataAlreadyExist("Our Service priority"), {}, {}));

    if (value?.serviceIds?.length && !(await Promise.all(value.serviceIds.map((s) => checkIdExist(serviceModel, s, "Service", res)))).every(Boolean)) return;

    value.createdBy = user?._id;
    value.updatedBy = user?._id;

    const response = await createOne(ourServiceModel, value);
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.addDataError, {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.addDataSuccess("Our Service"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const editOurService = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IOurServiceValidate = editOurServiceSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    const isPriorityExisting = await getFirstMatch(ourServiceModel, { priority: value.priority, isDeleted: false, _id: { $ne: new ObjectId(value?.ourServiceId) } }, {}, {});
    if (isPriorityExisting) return res.status(HTTP_STATUS.CONFLICT).json(new apiResponse(HTTP_STATUS.CONFLICT, responseMessage?.dataAlreadyExist("Our Service priority"), {}, {}));

    if (value?.serviceIds?.length && !(await Promise.all(value.serviceIds.map((s) => checkIdExist(serviceModel, s, "Service", res)))).every(Boolean)) return;

    value.updatedBy = user?._id;

    const response = await updateData(ourServiceModel, { _id: new ObjectId(value?.ourServiceId) }, value, {});
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.updateDataError("Our Service"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.updateDataSuccess("Our Service"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const deleteOurService = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: ICommonIdValidate = commonIdSchema.validate(req.params);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    const isExisting = await getFirstMatch(ourServiceModel, { _id: value?.id, isDeleted: false }, {}, {});
    if (!isExisting) return res.status(HTTP_STATUS.NOT_FOUND).json(new apiResponse(HTTP_STATUS.NOT_FOUND, responseMessage?.getDataNotFound("Our Service"), {}, {}));

    const response = await updateData(ourServiceModel, { _id: new ObjectId(value?.id) }, { isDeleted: true, updatedBy: user?._id }, {});
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.deleteDataError("Our Service"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.deleteDataSuccess("Our Service"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const getAllOurService = async (req, res) => {
  reqInfo(req);
  try {
    let { page, limit, search, activeFilter, serviceFilter } = req.query;
    page = Number(page);
    limit = Number(limit);
    let criteria: any = { isDeleted: false };
    const options = { sort: { priority: 1 }, skip: (page - 1) * limit, limit };

    if (activeFilter !== undefined) criteria.isActive = activeFilter == "true";

    if (search) criteria.name = { $regex: search, $options: "si" };

    if (serviceFilter) criteria.serviceIds = { $in: [new ObjectId(serviceFilter)] };

    const response = await findAllAndPopulate(ourServiceModel, criteria, {}, options, { path: "serviceIds", select: "_id name" });
    const totalData = await countData(ourServiceModel, criteria);
    const totalPages = Math.ceil(totalData / limit) || 1;
    const state = { page, limit, totalPages };

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("Our Service"), { ourService_data: response, totalData, state }, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};
