import { Schema } from "mongoose";
import { IBase, ICommonCriteria, ICommonGetValidate, IValidate } from "./base";

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
  serviceIds?: Schema.Types.ObjectId[];
  images?: string[];
  tagLine?: string;
  whyChoose?: IWhyChoose;
  ourServiceId?: Schema.Types.ObjectId;
}

export type IOurServiceValidate = IValidate & { value: IOurService };

export type IGetOurService = ICommonGetValidate & { serviceFilter?: Schema.Types.ObjectId };

export type IGetOurServiceValidate = IValidate & { value: IGetOurService };

export type IOurServiceCriteria = ICommonCriteria & { serviceIds: { $in: Schema.Types.ObjectId[] } };
