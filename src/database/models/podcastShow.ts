import mongoose from "mongoose";
import { IPodcastShow } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const podcastShowSchema = new mongoose.Schema<IPodcastShow>(
  {
    tagline: { type: String, default: "GUJARAT'S #1 PODCAST" },
    title: { type: String, default: "THE JAY THADESHWAR SHOW" },
    subtitle: { type: String, default: "" },
    description: {
      type: String,
      default:
        "Jay runs Gujarat’s most successful podcast, which he grew from 0 to 300 Million+ views in less than a year. He engages in deep conversations about life, business, growth, spirituality, art, and much more.",
    },
    row1Images: { type: [String], default: [] },
    row2Images: { type: [String], default: [] },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const podcastShowModel = mongoose.model<IPodcastShow>("podcast-show", podcastShowSchema);
