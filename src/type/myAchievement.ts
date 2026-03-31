import { IBase, IValidate } from "./base";

export interface IMyAchievement extends IBase {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
  btnTitle?: string;
  btnLink?: string;
  myAchievementId?: string;
}

export type IMyAchievementValidate = IValidate & { value: IMyAchievement };
