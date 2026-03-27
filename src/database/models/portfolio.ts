import mongoose, { Schema } from "mongoose";
import { IPortfolio, IPortfolioSocialLink } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const portfolioSocialLinkSchema = new mongoose.Schema<IPortfolioSocialLink>(
  {
    title: { type: String },
    link: { type: String },
    icon: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { _id: false },
);

const portfolioSchema = new mongoose.Schema<IPortfolio>(
  {
    thumbnailImage: { type: String },
    title: { type: String },
    subTitle: { type: String },
    serviceIds: [{ type: Schema.Types.ObjectId, ref: "service" }],
    isFeatured: { type: Boolean, default: false },
    link: { type: String },
    description: { type: String },
    images: { type: [String], default: [] },
    projectName: { type: String },
    client: { type: String },
    technology: { type: String },
    date: { type: Date },
    socialLinks: { type: [portfolioSocialLinkSchema], default: [] },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const portfolioModel = mongoose.model<IPortfolio>("portfolio", portfolioSchema);
