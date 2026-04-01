import Joi from "joi";
import { IContactUs } from "../type";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";
import { ICommonGetValidate } from "../type";

export const addContactUsSchema = Joi.object<IContactUs>({
  name: Joi.string().required(),
  phoneNo: Joi.number().required(),
  email: Joi.string().email().lowercase(),
  message: Joi.string().optional(),
  ...baseApiSchema,
});

export const editContactUsSchema = Joi.object<IContactUs>({
  contactUsId: objectId().required(),
  name: Joi.string().optional(),
  phoneNo: Joi.number().optional(),
  email: Joi.string().email().lowercase().optional().allow("", null),
  message: Joi.string().optional().allow("", null),
  ...baseApiSchema,
});

export const getContactUsSchema = Joi.object<ICommonGetValidate>({
  ...baseCommonFieldSchema,
});
