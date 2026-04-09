import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface IBusinessCategory extends IBase {
  name?: string;
  businessCategoryId?: Schema.Types.ObjectId;
}

export type IBusinessCategoryValidate = IValidate & { value: IBusinessCategory };
