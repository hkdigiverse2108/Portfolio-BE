import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface IContactUs extends IBase {
  contactUsId?: Schema.Types.ObjectId;
  name?: string;
  phoneNo?: number;
  email?: string;
  message?: string;
}

export type IContactUsValidate = IValidate & { value: IContactUs };
