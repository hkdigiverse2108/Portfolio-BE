import Joi from "joi";
import { ICommonGetValidate, ITestimonial } from "../type";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";

export const addTestimonialSchema = Joi.object<ITestimonial>({
  name: Joi.string().required(),
  designation: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
  ...baseApiSchema,
});

export const editTestimonialSchema = Joi.object<ITestimonial>({
  testimonialId: objectId().required(),
  name: Joi.string().optional(),
  designation: Joi.string().optional().allow("", null),
  description: Joi.string().optional().allow("", null),
  image: Joi.string().optional().allow("", null),
  ...baseApiSchema,
});

export const getTestimonialSchema = Joi.object<ICommonGetValidate>({
  ...baseCommonFieldSchema,
});
