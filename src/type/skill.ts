import { IBase, IValidate } from "./base";

export interface ISkill extends IBase {
  image?: string;
  title?: string;
  percentage?: number;
}

export type ISkillValidate = IValidate & { value: ISkill };
