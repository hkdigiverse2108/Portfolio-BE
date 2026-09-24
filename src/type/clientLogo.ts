import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface IClientLogo extends IBase {
  name?: string;
  image?: string;
  link?: string;
  category?: "B2C" | "B2B";
  clientLogoId?: Schema.Types.ObjectId;
}

export type IClientLogoValidate = IValidate & { value: IClientLogo };
