import mongoose, { Schema } from "mongoose";
import { IBlog } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const blogSchema = new mongoose.Schema<IBlog>(
  {
    thumbnailImage: { type: String },
    serviceId: { type: Schema.Types.ObjectId, ref: "service" },
    date: { type: Date },
    title: { type: String },
    description: { type: String },
    images: { type: [String] },
    tagLine: { type: String },
    tags: { type: [String] },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const blogModel = mongoose.model<IBlog>("blog", blogSchema);
