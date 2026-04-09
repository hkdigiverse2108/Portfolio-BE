import mongoose from "mongoose";
import { IService } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const businessCategorySchema = new mongoose.Schema<IService>(
  {
    name: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const businessCategoryModel = mongoose.model<IService>("business-category", businessCategorySchema);
