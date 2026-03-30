import mongoose from "mongoose";
import { ITestimonial } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const testimonialSchema = new mongoose.Schema<ITestimonial>(
  {
    name: { type: String },
    designation: { type: String },
    description: { type: String },
    image: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);
export const testimonialModel = mongoose.model<ITestimonial>("testimonial", testimonialSchema);
