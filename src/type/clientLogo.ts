import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface IClientLogo extends IBase {
  name?: string;
  image?: string;
  link?: string;
  clientLogoId?: Schema.Types.ObjectId;
}

export type IClientLogoValidate = IValidate & { value: IClientLogo };
