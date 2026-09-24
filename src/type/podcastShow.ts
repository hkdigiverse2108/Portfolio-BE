import { IBase, IValidate } from "./base";

export interface IPodcastShow extends IBase {
  tagline?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  row1Images?: string[];
  row2Images?: string[];
}

export type IPodcastShowValidate = IValidate & { value: IPodcastShow };
