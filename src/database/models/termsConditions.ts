import mongoose from "mongoose";
import { baseCommonFields, baseSchemaOptions } from "./base";
import { ITermsConditions } from "../../type";

const termsConditionsSchema = new mongoose.Schema<ITermsConditions>(
  {
    description: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const termsConditionsModel = mongoose.model<ITermsConditions>("terms-conditions", termsConditionsSchema);
