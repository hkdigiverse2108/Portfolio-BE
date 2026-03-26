import Joi from "joi";
import { commonContactSchema } from "./common";
import { SOCIAL_MEDIA_TYPE } from "../common/enum";

const socialMediaLinkSchema = Joi.object({
  title: Joi.string()
    .valid(...Object.values(SOCIAL_MEDIA_TYPE))
    .default(SOCIAL_MEDIA_TYPE.INSTAGRAM)
    .optional(),
  link: Joi.string().required().allow(""),
  icon: Joi.string().required().allow(""),
  isActive: Joi.boolean().required(),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().optional().allow(""),
  lastName: Joi.string().optional().allow(""),
  email: Joi.string().optional().allow(""),
  phoneNo: commonContactSchema.optional(),
  password: Joi.string().optional().allow(""),
  profileImage: Joi.string().optional().allow(""),
  otp: Joi.number().optional().allow(null),
  otpExpireTime: Joi.date().optional().allow(null),
  socialMediaLinks: Joi.array().items(socialMediaLinkSchema).optional(),
  offers: Joi.array().items(Joi.string()).optional(),
});
