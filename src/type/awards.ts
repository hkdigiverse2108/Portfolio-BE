import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface IAwards extends IBase {
  image?: string;
  iconImage?: string;
  title?: string;
  date?: Date;
  awardsId?: Schema.Types.ObjectId;
}

export type IAwardsValidate = IValidate & { value: IAwards };
