import { IBase, IValidate } from "./base";

export interface IClientLogo extends IBase {
  name?: string;
  image?: string;
  link?: string;
  clientLogoId?: string;
}

export type IClientLogoValidate = IValidate & { value: IClientLogo };
