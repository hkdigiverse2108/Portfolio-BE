import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface IBrand extends IBase {
  name?: string;
  image?: string;
  category?: "B2C" | "B2B";
  brandId?: Schema.Types.ObjectId;
}

export type IBrandValidate = IValidate & { value: IBrand };
