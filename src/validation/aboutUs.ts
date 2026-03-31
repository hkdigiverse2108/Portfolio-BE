import Joi from "joi";
import { baseApiSchema } from "./common";

export const updateAboutUsSchema = Joi.object({
  description: Joi.string().required().allow(""),
  ...baseApiSchema,
});
