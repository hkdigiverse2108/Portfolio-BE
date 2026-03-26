import mongoose from "mongoose";
import { IClientLogo } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const clientLogoSchema = new mongoose.Schema<IClientLogo>(
  {
    name: { type: String },
    image: { type: String },
    link: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const clientLogoModel = mongoose.model<IClientLogo>("client-logo", clientLogoSchema);