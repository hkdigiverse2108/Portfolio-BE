import { IBase, IPhoneNo, IValidate } from "./base";
export interface IBookMeeting {
  link?: string;
  phoneNo?: IPhoneNo;
  email?: string;
  address?: string;
}

export interface IRazorpaySetting {
  keyId?: string;
  keySecret?: string;
  isEnabled?: boolean;
}

export interface ISetting extends IBase {
  bookMeeting?: IBookMeeting;
  razorpay?: IRazorpaySetting;
}

export type ISettingValidate = IValidate & { value: ISetting };
