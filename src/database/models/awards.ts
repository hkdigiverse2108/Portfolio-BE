import mongoose from "mongoose";
import { IAwards } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const awardsSchema = new mongoose.Schema<IAwards>(
  {
    image: { type: String },
    iconImage: { type: String },
    title: { type: String },
    date: { type: Date },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const awardsModel = mongoose.model<IAwards>("awards", awardsSchema);
