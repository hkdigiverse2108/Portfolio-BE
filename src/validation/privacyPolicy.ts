import Joi from "joi";
import { baseApiSchema } from "./common";
import { IPrivacyPolicy } from "../type";

export const updatePrivacyPolicySchema = Joi.object<IPrivacyPolicy>({
  description: Joi.string().required().allow(""),
  ...baseApiSchema,
});
