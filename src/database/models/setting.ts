import mongoose from "mongoose";
import { baseCommonFields, baseSchemaOptions, phoneNoSchema } from "./base";
import { ISetting } from "../../type";

const settingSchema = new mongoose.Schema<ISetting>(
  {
    bookMeeting: {
      link: { type: String },
      email: { type: String, lowercase: true, trim: true },
      address: { type: String },
      phoneNo: phoneNoSchema,
    },
    razorpay: {
      keyId: { type: String, trim: true, default: "" },
      keySecret: { type: String, trim: true, default: "" },
      isEnabled: { type: Boolean, default: true },
    },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const settingModel = mongoose.model<ISetting>("setting", settingSchema);
