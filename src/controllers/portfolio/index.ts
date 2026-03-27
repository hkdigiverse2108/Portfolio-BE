import { apiResponse, HTTP_STATUS } from "../../common";
import { portfolioModel, serviceModel } from "../../database";
import { checkIdExist, countData, createOne, findAllAndPopulate, getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { ICommonIdValidate, IPortfolioValidate } from "../../type";
import { addPortfolioSchema, commonIdSchema, editPortfolioSchema } from "../../validation";

const ObjectId = require("mongoose").Types.ObjectId;

export const addPortfolio = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IPortfolioValidate = addPortfolioSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0].message, {}, {}));

    if (value?.serviceIds?.length && !(await Promise.all(value.serviceIds.map((s) => checkIdExist(serviceModel, s, "Service", res)))).every(Boolean)) return;

    value.createdBy = user?._id;
    value.updatedBy = user?._id;

    const response = await createOne(portfolioModel, value);
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.addDataError, {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage.addDataSuccess("Portfolio"), response, {}));
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const editPortfolio = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IPortfolioValidate = editPortfolioSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0].message, {}, {}));

    if (value?.serviceIds?.length && !(await Promise.all(value.serviceIds.map((s) => checkIdExist(serviceModel, s, "Service", res)))).every(Boolean)) return;

    value.updatedBy = user?._id;

    const response = await updateData(portfolioModel, { _id: new ObjectId(value?.portfolioId) }, value, {});
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.updateDataError("Portfolio"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage.updateDataSuccess("Portfolio"), response, {}));
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const deletePortfolio = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: ICommonIdValidate = commonIdSchema.validate(req.params);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0].message, {}, {}));

    const isExisting = await getFirstMatch(portfolioModel, { _id: value?.id, isDeleted: false }, {}, {});
    if (!isExisting) return res.status(HTTP_STATUS.NOT_FOUND).json(new apiResponse(HTTP_STATUS.NOT_FOUND, responseMessage?.getDataNotFound("Portfolio"), {}, {}));

    const response = await updateData(portfolioModel, { _id: new ObjectId(value?.id) }, { isDeleted: true, updatedBy: user?._id }, {});
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.deleteDataError("Portfolio"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.deleteDataSuccess("Portfolio"), response, {}));
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const getAllPortfolio = async (req, res) => {
  reqInfo(req);
  try {
    let { page, limit, search, activeFilter, serviceFilter, featuredFilter } = req.query;
    page = Number(page);
    limit = Number(limit);
    let criteria: any = { isDeleted: false };
    const options = { sort: { priority: 1 }, skip: (page - 1) * limit, limit };

    if (activeFilter !== undefined) criteria.isActive = activeFilter == "true";

    if (featuredFilter !== undefined) criteria.isFeatured = featuredFilter == "true";

    if (search) criteria.name = { $regex: search, $options: "si" };

    if (serviceFilter) criteria.serviceIds = { $in: [new ObjectId(serviceFilter)] };

    const response = await findAllAndPopulate(portfolioModel, criteria, {}, options, { path: "serviceIds", select: "_id name" });
    const totalData = await countData(portfolioModel, criteria);
    const totalPages = Math.ceil(totalData / limit) || 1;
    const state = { page, limit, totalPages };

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("Portfolio"), { portfolio_data: response, totalData, state }, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};
