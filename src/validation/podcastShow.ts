import Joi from "joi";
import { IPodcastShow } from "../type";
import { baseApiSchema } from "./common";

export const updatePodcastShowSchema = Joi.object<IPodcastShow>({
  tagline: Joi.string().optional().allow("", null),
  title: Joi.string().optional().allow("", null),
  subtitle: Joi.string().optional().allow("", null),
  description: Joi.string().optional().allow("", null),
  row1Images: Joi.array().items(Joi.string()).optional(),
  row2Images: Joi.array().items(Joi.string()).optional(),
  ...baseApiSchema,
});
