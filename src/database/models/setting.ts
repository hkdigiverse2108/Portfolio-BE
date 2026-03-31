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
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const settingModel = mongoose.model<ISetting>("setting", settingSchema);
