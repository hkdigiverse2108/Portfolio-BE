import { IBase, ICommonCriteria, ICommonGetValidate, IValidate } from "./base";

export interface IPortfolioSocialLink {
  title?: string;
  link?: string;
  icon?: string;
  isActive?: boolean;
}

export interface IPortfolio extends IBase {
  thumbnailImage?: string;
  title?: string;
  subTitle?: string;
  serviceIds?: string[];
  isFeatured?: boolean;
  link?: string;
  description?: string;
  images?: string[];
  projectName?: string;
  client?: string;
  technology?: string;
  date?: Date;
  socialLinks?: IPortfolioSocialLink[];
  portfolioId?: string;
}

export type IPortfolioValidate = IValidate & { value: IPortfolio };

export type IGetPortfolio = ICommonGetValidate & { serviceFilter?: string; featuredFilter?: boolean };

export type IGetPortfolioValidate = IValidate & { value: IGetPortfolio };

export type IPortfolioCriteria = ICommonCriteria & { serviceIds: { $in: string[] }; featuredFilter?: boolean };
