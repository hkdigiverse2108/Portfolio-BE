import { Schema } from "mongoose";
import { IBase, IValidate } from "./base";

export interface ISkill extends IBase {
  image?: string;
  title?: string;
  percentage?: number;
  skillId?: Schema.Types.ObjectId;
}

export type ISkillValidate = IValidate & { value: ISkill };
