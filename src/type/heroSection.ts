import { IBase, IValidate } from "./base";

export interface IHeroSection extends IBase {
  title: string;
  subTitles: string[];
  description: string;
  link: string;
  linkTitle: string;
}

export type IHeroSectionValidate = IValidate & { value: IHeroSection };
