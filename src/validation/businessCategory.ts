import Joi from "joi";
import { IBusinessCategory, ICommonGetValidate, IService } from "../type";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";

export const addBusinessCategorySchema = Joi.object<IBusinessCategory>({
  name: Joi.string().required(),
  ...baseApiSchema,
});

export const editBusinessCategorySchema = Joi.object<IBusinessCategory>({
  name: Joi.string().optional(),
  businessCategoryId: objectId().required(),
  ...baseApiSchema,
});

export const getBusinessCategorySchema = Joi.object<ICommonGetValidate>({
  ...baseCommonFieldSchema,
});
