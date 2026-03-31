import { IBase, IValidate } from "./base";

export interface IPrivacyPolicy extends IBase {
  description: string;
}

export type IPrivacyPolicyValidate = IValidate & { value: IPrivacyPolicy };
