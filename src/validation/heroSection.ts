import Joi from "joi";
import { baseApiSchema } from "./common";

export const updateHeroSectionSchema = Joi.object({
  title: Joi.string().required().allow(""),
  subTitles: Joi.array().items(Joi.string()).required(),
  description: Joi.string().optional().allow(""),
  link: Joi.string().optional().allow(""),
  linkTitle: Joi.string().optional().allow(""),
  ...baseApiSchema,
});
