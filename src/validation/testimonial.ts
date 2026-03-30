import Joi from "joi";
import { ITestimonial } from "../type";
import { baseApiSchema, objectId } from "./common";

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
  designation: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
  ...baseApiSchema,
});
