import { IBase, IValidate } from "./base";

export interface ITermsConditions extends IBase {
  description: string;
}

export type ITermsConditionsValidate = IValidate & { value: ITermsConditions };
