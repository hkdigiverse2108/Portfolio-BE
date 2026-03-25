import Joi from "joi";
import { commonContactSchema } from "./common";

const socialMediaLinkSchema = Joi.object({
  title: Joi.string().required().allow(""),
  link: Joi.string().required().allow(""),
  icon: Joi.string().required().allow(""),
  isActive: Joi.boolean().required(),
});

export const updateUserSchema = Joi.object({
  fullName: Joi.string().required().allow(""),
  email: Joi.string().required().allow(""),
  phoneNo: commonContactSchema.optional(),
  password: Joi.string().required().allow(""),
  profileImage: Joi.string().optional().allow(""),
  otp: Joi.number().optional().allow(null),
  otpExpireTime: Joi.date().optional().allow(null),
  socialMediaLinks: Joi.array().items(socialMediaLinkSchema).optional(),
});
