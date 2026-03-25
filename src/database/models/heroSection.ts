import mongoose from "mongoose";
import { baseCommonFields, baseSchemaOptions } from "./base";
import { IHeroSection } from "../../type";

const heroSectionSchema = new mongoose.Schema<IHeroSection>(
  {
    title: { type: String },
    subTitles: [{ type: String }],
    description: { type: String },
    link: { type: String },
    linkTitle: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const heroSectionModel = mongoose.model<IHeroSection>("hero-section", heroSectionSchema);
