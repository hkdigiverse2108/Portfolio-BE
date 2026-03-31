import mongoose from "mongoose";
import { IContactUs } from "../../type/contactUs";
import { baseCommonFields, baseSchemaOptions } from "./base";

const contactUsSchema = new mongoose.Schema<IContactUs>(
  {
    name: { type: String },
    phoneNo: { type: Number },
    email: { type: String },
    message: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const contactUsModel = mongoose.model<IContactUs>("contact-us", contactUsSchema);
