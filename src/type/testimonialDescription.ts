import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface ITestimonialDescription extends IBase {
  title?: string;
  subTitle?: string;
  rating?: number;
  testimonialDescriptionId?: Schema.Types.ObjectId;
}

export type ITestimonialDescriptionValidate = IValidate & { value: ITestimonialDescription };
