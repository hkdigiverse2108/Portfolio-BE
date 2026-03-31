import mongoose from "mongoose";
import { IMyAchievement } from "../../type";
import { baseCommonFields, baseSchemaOptions } from "./base";

const myAchievementSchema = new mongoose.Schema<IMyAchievement>(
  {
    title: { type: String },
    description: { type: String },
    link: { type: String },
    image: { type: String },
    btnTitle: { type: String },
    btnLink: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

export const myAchievementModel = mongoose.model<IMyAchievement>("my-achievement", myAchievementSchema);
