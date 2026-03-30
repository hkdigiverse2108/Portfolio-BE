import Joi from "joi";
import { IOurService } from "../type";
import { baseApiSchema, objectId } from "./common";

export const addOurServiceSchema = Joi.object<IOurService>({
  priority: Joi.number().required(),
  title: Joi.string().required(),
  shortDescription: Joi.string().optional(),
  description: Joi.string().optional(),
  thumbnailImage: Joi.string().optional(),
  serviceIds: Joi.array().items(objectId()).optional(),
  images: Joi.array().items(Joi.string()).optional(),
  tagLine: Joi.string().optional(),
  whyChoose: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
  }).optional(),
  ...baseApiSchema,
});

export const editOurServiceSchema = Joi.object<IOurService>({
  ourServiceId: objectId().required(),
  priority: Joi.number().optional(),
  title: Joi.string().optional(),
  shortDescription: Joi.string().optional(),
  description: Joi.string().optional(),
  thumbnailImage: Joi.string().optional(),
  serviceIds: Joi.array().items(objectId()).optional(),
  images: Joi.array().items(Joi.string()).optional(),
  tagLine: Joi.string().optional(),
  whyChoose: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
  }).optional(),
  ...baseApiSchema,
});
