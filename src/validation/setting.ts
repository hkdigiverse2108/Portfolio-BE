import Joi from "joi";
import { baseApiSchema, commonContactSchema } from "./common";
import { ISetting } from "../type";

export const updateSettingSchema = Joi.object<ISetting>({
  bookMeeting: Joi.object({
    link: Joi.string().allow(""),
    phoneNo: commonContactSchema.optional(),
    email: Joi.string().email().lowercase().optional(),
    address: Joi.string().allow(""),
  }),
  ...baseApiSchema,
});
