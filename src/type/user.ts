import { IBase, IPhoneNo } from "./base";

export interface IUser extends IBase {
  fullName?: string;
  email?: string;
  phoneNo?: IPhoneNo;
  profileImage?: string;
  password?: string;
  showPassword?: string;

  //   otp?: number;
  //   otpExpireTime?: Date;
}
