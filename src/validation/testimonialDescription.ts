import Joi from "joi";
import { ITestimonialDescription } from "../type";

export const updateTestimonialDescriptionSchema = Joi.object<ITestimonialDescription>({
  title: Joi.string().optional().allow("", null),
  subTitle: Joi.string().optional().allow("", null),
  rating: Joi.number().optional().allow("", null),
});
