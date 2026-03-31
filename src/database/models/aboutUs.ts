import mongoose from "mongoose";
import { baseCommonFields, baseSchemaOptions } from "./base";
import { IAboutUs } from "../../type";

const aboutUsSchema = new mongoose.Schema<IAboutUs>(
  {
    description: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const aboutUsModel = mongoose.model<IAboutUs>("about-us", aboutUsSchema);
