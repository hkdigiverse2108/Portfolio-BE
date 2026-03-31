import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface IWorkExperience extends IBase {
  year?: number;
  title?: string;
  subTitle?: string;
  workExperienceId?: Schema.Types.ObjectId;
}

export type IWorkExperienceValidate = IValidate & { value: IWorkExperience };
