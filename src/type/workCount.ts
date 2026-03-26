import { IBase, IValidate } from "./base";

export interface IWorkCount extends IBase {
  workCountId?: string;
  number?: string;
  title?: string;
}

export type IWorkCountValidate = IValidate & { value: IWorkCount };

