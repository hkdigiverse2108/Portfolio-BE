import { IBase, IValidate } from "./base";

export interface ITestimonial extends IBase {
  name?: string;
  designation?: string;
  description?: string;
  image?: string;
  testimonialId?: string;
}

export type ITestimonialValidate = IValidate & { value: ITestimonial };
