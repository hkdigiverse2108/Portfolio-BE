import { IBase, IValidate } from "./base";

export interface IAwards extends IBase {
  image?: string;
  icon?: string;
  title?: string;
  date?: Date;
  awardsId?: string;
}

export type IAwardsValidate = IValidate & { value: IAwards };
