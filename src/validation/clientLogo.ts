import Joi from "joi";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";
import { IClientLogo, ICommonGetValidate } from "../type";

export const addClientLogoSchema = Joi.object<IClientLogo>({
  name: Joi.string().required(),
  image: Joi.string().required(),
  link: Joi.string().optional(),
  category: Joi.string().valid("B2C", "B2B").optional(),
  ...baseApiSchema,
});

export const editClientLogoSchema = Joi.object<IClientLogo>({
  clientLogoId: objectId().required(),
  name: Joi.string().optional(),
  image: Joi.string().optional().allow("", null),
  link: Joi.string().optional().allow("", null),
  category: Joi.string().valid("B2C", "B2B").optional(),
  ...baseApiSchema,
});

export const getClientLogoSchema = Joi.object<ICommonGetValidate>({
  ...baseCommonFieldSchema,
});