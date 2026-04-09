import { Schema } from "mongoose";
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
  serviceIds?: Schema.Types.ObjectId[];
  businessCategoryIds?: Schema.Types.ObjectId[];
  isFeatured?: boolean;
  link?: string;
  description?: string;
  images?: string[];
  projectName?: string;
  client?: string;
  technology?: string;
  date?: Date;
  socialLinks?: IPortfolioSocialLink[];
  portfolioId?: Schema.Types.ObjectId;
}

export type IPortfolioValidate = IValidate & { value: IPortfolio };

export type IGetPortfolio = ICommonGetValidate & { serviceFilter?: Schema.Types.ObjectId; businessCategoryFilter?: Schema.Types.ObjectId; featuredFilter?: boolean };

export type IGetPortfolioValidate = IValidate & { value: IGetPortfolio };

export type IPortfolioCriteria = ICommonCriteria & { serviceIds: { $in: Schema.Types.ObjectId[] }; businessCategoryIds: { $in: Schema.Types.ObjectId[] }; featuredFilter?: boolean };
