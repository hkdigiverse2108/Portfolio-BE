import Joi from "joi";
import { ITestimonialDescription } from "../type";

export const updateTestimonialDescriptionSchema = Joi.object<ITestimonialDescription>({
  title: Joi.string().optional(),
  subTitle: Joi.string().optional(),
  rating: Joi.number().optional(),
});
