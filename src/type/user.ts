import { IBase, IPhoneNo, IValidate } from "./base";
export interface ISocialMediaLink {
  title: string;
  link: string;
  icon: string;
  isActive: boolean;
}

export interface IUser extends IBase {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNo?: IPhoneNo;
  profileImage?: string;
  password?: string;
  showPassword?: string;
  otp?: number;
  otpExpireTime?: Date;
  socialMediaLinks?: ISocialMediaLink[];
  offers?: string[];
}

export type IUserValidate = IValidate & { value: IUser };
