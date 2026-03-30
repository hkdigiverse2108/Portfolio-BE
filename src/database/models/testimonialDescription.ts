import mongoose from "mongoose";
import { ITestimonialDescription } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const testimonialDescriptionSchema = new mongoose.Schema<ITestimonialDescription>(
  {
    title: { type: String },
    subTitle: { type: String },
    rating: { type: Number },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const testimonialDescriptionModel = mongoose.model<ITestimonialDescription>("testimonial-description", testimonialDescriptionSchema);
