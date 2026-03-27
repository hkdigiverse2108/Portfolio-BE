import mongoose from "mongoose";
import { IWorkExperience } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const workExperienceSchema = new mongoose.Schema<IWorkExperience>(
  {
    year: { type: Number },
    title: { type: String },
    subTitle: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const workExperienceModel = mongoose.model<IWorkExperience>("work-experience", workExperienceSchema);