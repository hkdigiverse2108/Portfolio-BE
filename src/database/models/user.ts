import mongoose from "mongoose";
import { IUser } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: { type: String },
    email: { type: String, lowercase: true, trim: true },
    phoneNo: {
      countryCode: { type: String },
      number: { type: Number },
    },
    password: { type: String },
    profileImage: { type: String },
    //   otp: { type: Number, default: null },
    //   otpExpireTime: { type: Date, default: null },
    //   isEmailVerified: { type: Boolean, default: false },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const userModel = mongoose.model<IUser>("user", userSchema);
