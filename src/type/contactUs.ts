import { IBase, IValidate } from "./base";

export interface IContactUs extends IBase {
  contactUsId?: string;
  name?: string;
  phoneNo?: number;
  email?: string;
  message?: string;
}

export type IContactUsValidate = IValidate & { value: IContactUs };
