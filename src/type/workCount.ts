import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface IWorkCount extends IBase {
  workCountId?: Schema.Types.ObjectId;
  number?: string;
  title?: string;
}

export type IWorkCountValidate = IValidate & { value: IWorkCount };

