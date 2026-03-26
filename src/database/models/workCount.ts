import mongoose from "mongoose";
import { IWorkCount } from "../../type/workCount";
import { baseCommonFields, baseSchemaOptions } from "./base";

const workCountSchema = new mongoose.Schema<IWorkCount>(
  {
    number: { type: String },
    title: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const workCountModel = mongoose.model<IWorkCount>("work-count", workCountSchema);