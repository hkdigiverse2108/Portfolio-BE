import { apiResponse, HTTP_STATUS } from "../../common";
import { skillModel } from "../../database";
import { countData, createOne, getData, getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { ICommonIdValidate, ISkillValidate } from "../../type";
import { addSkillSchema, commonIdSchema, editSkillSchema } from "../../validation";

const ObjectId = require("mongoose").Types.ObjectId;

export const addSkill = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: ISkillValidate = await addSkillSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    let isExisting = await getFirstMatch(skillModel, { title: value.title, isDeleted: false }, {}, {});
    if (isExisting) return res.status(HTTP_STATUS.CONFLICT).json(new apiResponse(HTTP_STATUS.CONFLICT, responseMessage?.dataAlreadyExist("Skill title"), {}, {}));

    value.createdBy = user?._id;
    value.updatedBy = user?._id;

    const response = await createOne(skillModel, value);
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.addDataError, {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.addDataSuccess("Skill"), response, {}));
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const editSkill = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: ISkillValidate = await editSkillSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    let isExisting = await getFirstMatch(skillModel, { _id: value?.skillId, isDeleted: false }, {}, {});
    if (!isExisting) return res.status(HTTP_STATUS.NOT_FOUND).json(new apiResponse(HTTP_STATUS.NOT_FOUND, responseMessage?.getDataNotFound("Skill"), {}, {}));

    if (value.title) {
      let isDuplicate = await getFirstMatch(skillModel, { title: value.title, isDeleted: false, _id: { $ne: value?.skillId } }, {}, {});
      if (isDuplicate) return res.status(HTTP_STATUS.CONFLICT).json(new apiResponse(HTTP_STATUS.CONFLICT, responseMessage?.dataAlreadyExist("Skill title"), {}, {}));
    }

    value.updatedBy = user?._id;

    const response = await updateData(skillModel, { _id: new ObjectId(value?.skillId) }, value, {});
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.updateDataError("Skill"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.updateDataSuccess("Skill"), response, {}));
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const deleteSkill = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: ICommonIdValidate = await commonIdSchema.validate(req.params);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    let isExisting = await getFirstMatch(skillModel, { _id: value?.id, isDeleted: false }, {}, {});
    if (!isExisting) return res.status(HTTP_STATUS.NOT_FOUND).json(new apiResponse(HTTP_STATUS.NOT_FOUND, responseMessage?.getDataNotFound("Skill"), {}, {}));

    const response = await updateData(skillModel, { _id: new ObjectId(value?.id) }, { isDeleted: true, updatedBy: user?._id }, {});
    if (!response) return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json(new apiResponse(HTTP_STATUS.NOT_IMPLEMENTED, responseMessage?.deleteDataError("Skill"), {}, {}));

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.deleteDataSuccess("Skill"), response, {}));
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const getAllSkill = async (req, res) => {
  reqInfo(req);
  try {
    let { page, limit, search, activeFilter } = req.query;
    page = Number(page);
    limit = Number(limit);
    let criteria: any = { isDeleted: false };

    if (activeFilter !== undefined) criteria.isActive = activeFilter == "true";

    if (search) criteria.title = { $regex: search, $options: "si" };

    const options = { sort: { createdAt: -1 }, skip: (page - 1) * limit, limit };

    const response = await getData(skillModel, criteria, {}, options);
    const totalData = await countData(skillModel, criteria);
    const totalPages = Math.ceil(totalData / limit) || 1;
    const state = { page, limit, totalPages };

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("Skill"), { skill_data: response, totalData, state }, {}));
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};
