import mongoose, { Schema } from "mongoose";
import { baseCommonFields, baseSchemaOptions } from "./base";
import { IOurService, IWhyChoose } from "../../type";

const whyChooseSchema = new mongoose.Schema<IWhyChoose>(
  {
    title: { type: String },
    description: { type: String },
  },
  { _id: false },
);

const ourServiceSchema = new mongoose.Schema<IOurService>(
  {
    priority: { type: Number, default: 0 },
    title: { type: String },
    shortDescription: { type: String },
    description: { type: String },
    thumbnailImage: { type: String },
    serviceIds: [{ type: Schema.Types.ObjectId, ref: "service" }],
    images: { type: [String] },
    tagLine: { type: String },
    whyChoose: whyChooseSchema,
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const ourServiceModel = mongoose.model<IOurService>("our-service", ourServiceSchema);
