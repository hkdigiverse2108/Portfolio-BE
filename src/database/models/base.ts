import { Schema, SchemaOptions } from "mongoose";

export const baseCommonFields = {
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "user", default: null },
  updatedBy: { type: Schema.Types.ObjectId, ref: "user", default: null },
};

export const baseSchemaOptions: SchemaOptions<any> = {
  timestamps: true,
  versionKey: false,
};

export const phoneNoSchema = {
  countryCode: { type: String },
  number: { type: Number },
};
