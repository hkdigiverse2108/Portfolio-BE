import { IValidate } from "./base";
import { IUser } from "./user";

export type IRegisterValidate = IValidate & { value: IUser };

export type ILoginValidate = IValidate & { value: IUser };

export type IForgotPasswordValidate = IValidate & { value: IUser };

export type IUpdatePasswordValidate = IValidate & { value: IUser & { newPassword: string; confirmPassword: string } };

export type IResetPasswordValidate = IValidate & { value: IUser & { oldPassword: string; newPassword: string; confirmPassword: string } };

export type IVerifyOtpValidate = IValidate & { value: IUser };

export type IResendOtpValidate = IValidate & { value: IUser };
