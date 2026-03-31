import { IBase, IValidate } from "./base";

export interface IAboutUs extends IBase {
  description: string;
}

export type IAboutUsValidate = IValidate & { value: IAboutUs };
