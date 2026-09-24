import { apiResponse, HTTP_STATUS } from "../../common";
import { brandModel } from "../../database";
import { countData, createOne, getData, getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { IBrandValidate, ICommonIdValidate, IGetCommonValidate } from "../../type";
import { addBrandSchema, commonIdSchema, editBrandSchema, getBrandSchema } from "../../validation";

const ObjectId = require("mongoose").Types.ObjectId;

export const addBrand = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IBrandValidate = addBrandSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    const isExisting = await getFirstMatch(brandModel, { name: value.name, category: value.category, isDeleted: false }, {}, {});
    if (isExisting) return res.status(HTTP_STATUS.CONFLICT).json(new apiResponse(HTTP_STATUS.CONFLICT, responseMessage?.dataAlreadyExist("Brand Name in this category"), {}, {}));

    value.createdBy = user?._id;
    value.updatedBy = user?._id;

    const response = await createOne(brandModel, value);
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.addDataError, {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.addDataSuccess("Brand"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const editBrand = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IBrandValidate = editBrandSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    const isExisting = await getFirstMatch(brandModel, { _id: value?.brandId, isDeleted: false }, {}, {});
    if (!isExisting) return res.status(HTTP_STATUS.NOT_FOUND).json(new apiResponse(HTTP_STATUS.NOT_FOUND, responseMessage?.getDataNotFound("Brand"), {}, {}));

    if (value.name) {
      const categoryToCheck = value.category || isExisting.category;
      let isDuplicate = await getFirstMatch(brandModel, { name: value.name, category: categoryToCheck, isDeleted: false, _id: { $ne: value?.brandId } }, {}, {});
      if (isDuplicate) return res.status(HTTP_STATUS.CONFLICT).json(new apiResponse(HTTP_STATUS.CONFLICT, responseMessage?.dataAlreadyExist("Brand Name in this category"), {}, {}));
    }

    value.updatedBy = user?._id;

    const response = await updateData(brandModel, { _id: new ObjectId(value?.brandId) }, value, {});
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.updateDataError("Brand"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.updateDataSuccess("Brand"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const deleteBrand = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: ICommonIdValidate = commonIdSchema.validate(req.params);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    let isExisting = await getFirstMatch(brandModel, { _id: value?.id, isDeleted: false }, {}, {});
    if (!isExisting) return res.status(HTTP_STATUS.NOT_FOUND).json(new apiResponse(HTTP_STATUS.NOT_FOUND, responseMessage?.getDataNotFound("Brand"), {}, {}));

    const response = await updateData(brandModel, { _id: new ObjectId(value?.id) }, { isDeleted: true, updatedBy: user?._id }, {});
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.deleteDataError("Brand"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.deleteDataSuccess("Brand"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const getAllBrand = async (req, res) => {
  reqInfo(req);
  try {
    const { error, value }: IGetCommonValidate = getBrandSchema.validate(req.query);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    let { page, limit, search, activeFilter } = value;
    page = Number(page);
    limit = Number(limit);

    const category = (req.query.category || req.query.categoryFilter) as string;

    const criteria: any = {
      isDeleted: false,
      ...(activeFilter !== undefined && { isActive: activeFilter === true }),
      ...(search && { name: { $regex: search, $options: "si" } }),
      ...(category && { category }),
    };

    const options: any = { sort: { createdAt: -1 } };
    if (page && limit) {
      options.skip = (page - 1) * limit;
      options.limit = limit;
    }

    const [response, totalData] = await Promise.all([getData(brandModel, criteria, {}, options), countData(brandModel, criteria)]);
    const totalPages = limit ? Math.ceil(totalData / limit) || 1 : 1;
    const state = { page: page || 1, limit: limit || totalData, totalPages };

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("Brand"), { brand_data: response, totalData, state }, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};
