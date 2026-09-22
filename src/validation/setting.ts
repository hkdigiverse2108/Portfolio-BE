import Joi from "joi";
import { baseApiSchema, commonContactSchema } from "./common";
import { ISetting } from "../type";

export const updateSettingSchema = Joi.object<ISetting>({
  bookMeeting: Joi.object({
    link: Joi.string().allow("").optional(),
    phoneNo: commonContactSchema.optional(),
    email: Joi.string().email().lowercase().optional(),
    address: Joi.string().allow("").optional(),
  }).optional(),
  razorpay: Joi.object({
    keyId: Joi.string().allow("").optional(),
    keySecret: Joi.string().allow("").optional(),
    isEnabled: Joi.boolean().optional(),
  }).optional(),
  ...baseApiSchema,
});
