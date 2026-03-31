import Joi from "joi";
import { baseApiSchema } from "./common";
import { ITermsConditions } from "../type";

export const updateTermsConditionsSchema = Joi.object<ITermsConditions>({
  description: Joi.string().required().allow(""),
  ...baseApiSchema,
});
