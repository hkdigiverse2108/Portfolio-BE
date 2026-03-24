import Joi from "joi";
import { commonContactSchema, objectId } from "./common";

export const registerSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
  profileImage: Joi.string().optional().allow(""),
  role: objectId().optional(),
  phoneNo: commonContactSchema.optional(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().lowercase().required(),
  password: Joi.string().required(),
});
