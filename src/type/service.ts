import { IBase, IValidate } from "./base";

export interface IService extends IBase {
  name?: string;
  serviceId?: string;
}

export type IServiceValidate = IValidate & { value: IService };
