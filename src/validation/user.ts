import Joi from "joi";
import { baseApiSchema, commonContactSchema } from "./common";
import { SOCIAL_MEDIA_TYPE } from "../common/enum";

const socialMediaLinkSchema = Joi.object({
  icon: Joi.string()
    .valid(...Object.values(SOCIAL_MEDIA_TYPE))
    .default(SOCIAL_MEDIA_TYPE.INSTAGRAM)
    .optional(),
  link: Joi.string().required().allow(""),
  title: Joi.string().required().allow(""),
  ...baseApiSchema,
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().optional().allow(""),
  lastName: Joi.string().optional().allow(""),
  email: Joi.string().optional().allow(""),
  phoneNo: commonContactSchema.optional(),
  password: Joi.string().optional().allow(""),
  profileImage: Joi.string().optional().allow("", null),
  otp: Joi.number().optional().allow(null),
  otpExpireTime: Joi.date().optional().allow(null),
  socialMediaLinks: Joi.array().items(socialMediaLinkSchema).optional(),
  offers: Joi.array().items(Joi.string()).optional(),
  logoTitle: Joi.string().optional().allow("", null),
  ...baseApiSchema,
});
