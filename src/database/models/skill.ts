import mongoose from "mongoose";
import { baseCommonFields, baseSchemaOptions } from "./base";
import { ISkill } from "../../type";

const skillSchema = new mongoose.Schema<ISkill>(
  {
    image: { type: String },
    title: { type: String },
    percentage: { type: Number },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const skillModel = mongoose.model<ISkill>("skill", skillSchema);
