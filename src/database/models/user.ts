import mongoose from "mongoose";
import { ISocialMediaLink, IUser } from "../../type";
import { baseCommonFields, baseSchemaOptions, phoneNoSchema } from "./base";

const socialMediaLinkSchema = new mongoose.Schema<ISocialMediaLink>(
  {
    title: { type: String },
    link: { type: String },
    icon: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    _id: false,
  },
);

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, capitalize: true },
    lastName: { type: String, capitalize: true },
    email: { type: String, lowercase: true, trim: true },
    phoneNo: phoneNoSchema,
    password: { type: String },
    profileImage: { type: String },
    otp: { type: Number, default: null },
    otpExpireTime: { type: Date, default: null },
    socialMediaLinks: { type: [socialMediaLinkSchema], default: [] },
    offers: { type: [String], default: [] },
    logoTitle: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const userModel = mongoose.model<IUser>("user", userSchema);
