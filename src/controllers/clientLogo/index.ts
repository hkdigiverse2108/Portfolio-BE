import { apiResponse, HTTP_STATUS } from "../../common";
import { clientLogoModel } from "../../database";
import { countData, createOne, getData, getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { IClientLogoValidate, ICommonIdValidate } from "../../type";
import { addClientLogoSchema, commonIdSchema, editClientLogoSchema } from "../../validation";

const ObjectId = require("mongoose").Types.ObjectId;

export const addClientLogo = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IClientLogoValidate = addClientLogoSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    const isExisting = await getFirstMatch(clientLogoModel, { name: value.name, isDeleted: false }, {}, {});
    if (isExisting) return res.status(HTTP_STATUS.CONFLICT).json(new apiResponse(HTTP_STATUS.CONFLICT, responseMessage?.dataAlreadyExist("Client Logo Name"), {}, {}));

    value.createdBy = user?._id;
    value.updatedBy = user?._id;

    const response = await createOne(clientLogoModel, value);
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.addDataError, {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.addDataSuccess("Client Logo"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const editClientLogo = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IClientLogoValidate = editClientLogoSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    const isExisting = await getFirstMatch(clientLogoModel, { _id: value?.clientLogoId, isDeleted: false }, {}, {});
    if (!isExisting) return res.status(HTTP_STATUS.NOT_FOUND).json(new apiResponse(HTTP_STATUS.NOT_FOUND, responseMessage?.getDataNotFound("Client Logo"), {}, {}));

    if (value.name) {
      let isDuplicate = await getFirstMatch(clientLogoModel, { name: value.name, isDeleted: false, _id: { $ne: value?.clientLogoId } }, {}, {});
      if (isDuplicate) return res.status(HTTP_STATUS.CONFLICT).json(new apiResponse(HTTP_STATUS.CONFLICT, responseMessage?.dataAlreadyExist("Client Logo Name"), {}, {}));
    }

    value.updatedBy = user?._id;

    const response = await updateData(clientLogoModel, { _id: new ObjectId(value?.clientLogoId) }, value, {});

    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.updateDataError("Client Logo"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.updateDataSuccess("Client Logo"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const deleteClientLogo = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: ICommonIdValidate = commonIdSchema.validate(req.params);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    let isExisting = await getFirstMatch(clientLogoModel, { _id: value?.id, isDeleted: false }, {}, {});
    if (!isExisting) return res.status(HTTP_STATUS.NOT_FOUND).json(new apiResponse(HTTP_STATUS.NOT_FOUND, responseMessage?.getDataNotFound("Client Logo"), {}, {}));

    const response = await updateData(clientLogoModel, { _id: new ObjectId(value?.id) }, { isDeleted: true, updatedBy: user?._id }, {});

    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.deleteDataError("Client Logo"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.deleteDataSuccess("Client Logo"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const getAllClientLogo = async (req, res) => {
  reqInfo(req);
  try {
    let { page, limit, search, activeFilter } = req.query;
    page = Number(page);
    limit = Number(limit);
    let criteria: any = { isDeleted: false };

    if (activeFilter !== undefined) criteria.isActive = activeFilter == "true";

    if (search) criteria.name = { $regex: search, $options: "si" };

    const options = { sort: { createdAt: -1 }, skip: (page - 1) * limit, limit };

    const response = await getData(clientLogoModel, criteria, {}, options);
    const totalData = await countData(clientLogoModel, criteria);
    const totalPages = Math.ceil(totalData / limit) || 1;
    const state = { page, limit, totalPages };

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("Client Logo"), { clientLogo_data: response, totalData, state }, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};
