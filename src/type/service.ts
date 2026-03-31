import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface IService extends IBase {
  name?: string;
  serviceId?: Schema.Types.ObjectId;
}

export type IServiceValidate = IValidate & { value: IService };
