import mongoose from "mongoose";
import { IService } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const serviceSchema = new mongoose.Schema<IService>(
  {
    name: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const serviceModel = mongoose.model<IService>("service", serviceSchema);
