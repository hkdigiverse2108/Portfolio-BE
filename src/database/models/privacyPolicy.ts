import mongoose from "mongoose";
import { baseCommonFields, baseSchemaOptions } from "./base";
import { IPrivacyPolicy } from "../../type";

const privacyPolicySchema = new mongoose.Schema<IPrivacyPolicy>(
  {
    description: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const privacyPolicyModel = mongoose.model<IPrivacyPolicy>("privacy-policy", privacyPolicySchema);
