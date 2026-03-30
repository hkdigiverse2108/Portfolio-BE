import { apiResponse, HTTP_STATUS } from "../../common";
import { blogModel, serviceModel } from "../../database";
import { checkIdExist, countData, createOne, findAllAndPopulate, getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { IBlogCriteria, IBlogValidate, ICommonIdValidate, IGetBlogValidate } from "../../type";
import { addBlogSchema, commonIdSchema, editBlogSchema, getBlogSchema } from "../../validation";

const ObjectId = require("mongoose").Types.ObjectId;

export const addBlog = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IBlogValidate = addBlogSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    if (value?.serviceIds?.length && !(await Promise.all(value.serviceIds.map((s) => checkIdExist(serviceModel, s, "Service", res)))).every(Boolean)) return;

    value.createdBy = user?._id;
    value.updatedBy = user?._id;

    const response = await createOne(blogModel, value);
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.addDataError, {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.addDataSuccess("Blog"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const editBlog = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IBlogValidate = editBlogSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    if (value?.serviceIds?.length && !(await Promise.all(value.serviceIds.map((s) => checkIdExist(serviceModel, s, "Service", res)))).every(Boolean)) return;

    value.updatedBy = user?._id;

    const response = await updateData(blogModel, { _id: new ObjectId(value?.blogId) }, value, {});
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.updateDataError("Blog"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.updateDataSuccess("Blog"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const deleteBlog = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: ICommonIdValidate = commonIdSchema.validate(req.params);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    const isExisting = await getFirstMatch(blogModel, { _id: value?.id, isDeleted: false }, {}, {});
    if (!isExisting) return res.status(HTTP_STATUS.NOT_FOUND).json(new apiResponse(HTTP_STATUS.NOT_FOUND, responseMessage?.getDataNotFound("Blog"), {}, {}));

    const response = await updateData(blogModel, { _id: new ObjectId(value?.id) }, { isDeleted: true, updatedBy: user?._id }, {});
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.deleteDataError("Blog"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.deleteDataSuccess("Blog"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const allBlog = async (req, res) => {
  reqInfo(req);
  try {
    const { error, value }: IGetBlogValidate = await getBlogSchema.validate(req.query);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    let { page, limit, search, activeFilter, serviceFilter } = value;
    page = Number(page);
    limit = Number(limit);

    const criteria: IBlogCriteria = {
      isDeleted: false,
      ...(activeFilter !== undefined && { isActive: activeFilter === true }),
      ...(search && { title: { $regex: search, $options: "si" } }),
      ...(serviceFilter && { serviceIds: { $in: [new ObjectId(serviceFilter)] } }),
    };

    const options = { sort: { priority: 1 }, skip: (page - 1) * limit, limit };
    const [response, totalData] = await Promise.all([findAllAndPopulate(blogModel, criteria, {}, options, { path: "serviceIds", select: "_id name" }), countData(blogModel, criteria)]);
    const totalPages = Math.ceil(totalData / limit) || 1;
    const state = { page, limit, totalPages };

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("Blog"), { blog_data: response, totalData, state }, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};
