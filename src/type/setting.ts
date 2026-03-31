import { IBase, IPhoneNo, IValidate } from "./base";
export interface IBookMeeting {
  link?: string;
  phoneNo?: IPhoneNo;
  email?: string;
  address?: string;
}

export interface ISetting extends IBase {
  bookMeeting?: IBookMeeting;
}

export type ISettingValidate = IValidate & { value: ISetting };
