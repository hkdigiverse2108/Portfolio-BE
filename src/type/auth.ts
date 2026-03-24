import { IValidate } from "./base";
import { IUser } from "./user";

export type IRegisterValidate = IValidate & { value: IUser };

export type ILoginValidate = IValidate & { value: IUser };
