import { IBase, IValidate } from "./base";

export interface IWorkExperience extends IBase {
  year?: number;
  title?: string;
  subTitle?: string;
  workExperienceId?: string;
}

export type IWorkExperienceValidate = IValidate & { value: IWorkExperience };
