import { IBase, IValidate } from "./base";

export interface IWhyChoose {
  title?: string;
  description?: string;
}

export interface IOurService extends IBase {
  priority?: number;
  title?: string;
  shortDescription?: string;
  description?: string;
  thumbnailImage?: string;
  serviceIds?: string[];
  images?: string[];
  tagLine?: string;
  whyChoose?: IWhyChoose;
  ourServiceId?: string;
}

export type IOurServiceValidate = IValidate & { value: IOurService };
