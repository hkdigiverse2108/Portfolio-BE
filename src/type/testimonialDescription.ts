import { IBase, IValidate } from "./base";

export interface ITestimonialDescription extends IBase {
  title?: string;
  subTitle?: string;
  rating?: number;
  testimonialDescriptionId?: string;
}

export type ITestimonialDescriptionValidate = IValidate & { value: ITestimonialDescription };
