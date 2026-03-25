import { IBase, IPhoneNo } from "./base";
export interface ISocialMediaLink {
  title: string;
  link: string;
  icon: string;
  isActive: boolean;
}

export interface IUser extends IBase {
  fullName?: string;
  email?: string;
  phoneNo?: IPhoneNo;
  profileImage?: string;
  password?: string;
  showPassword?: string;
  otp?: number;
  otpExpireTime?: Date;
  socialMediaLinks?: ISocialMediaLink[];
}
