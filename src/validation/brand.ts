import Joi from "joi";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";
import { IBrand, ICommonGetValidate } from "../type";

export const addBrandSchema = Joi.object<IBrand>({
  name: Joi.string().required(),
  image: Joi.string().required(),
  category: Joi.string().valid("B2C", "B2B").default("B2C"),
  ...baseApiSchema,
});

export const editBrandSchema = Joi.object<IBrand>({
  brandId: objectId().required(),
  name: Joi.string().optional(),
  image: Joi.string().optional().allow("", null),
  category: Joi.string().valid("B2C", "B2B").optional(),
  ...baseApiSchema,
});

export const getBrandSchema = Joi.object<ICommonGetValidate & { categoryFilter?: string }>({
  ...baseCommonFieldSchema,
  categoryFilter: Joi.string().valid("B2C", "B2B").optional(),
});
