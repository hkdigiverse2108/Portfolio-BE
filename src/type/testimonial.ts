import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface ITestimonial extends IBase {
  name?: string;
  designation?: string;
  description?: string;
  image?: string;
  testimonialId?: Schema.Types.ObjectId;
}

export type ITestimonialValidate = IValidate & { value: ITestimonial };
