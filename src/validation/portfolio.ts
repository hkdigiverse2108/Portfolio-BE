import Joi from "joi";
import { ICommonGetValidate, IGetPortfolio, IPortfolio } from "../type";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";
import { SOCIAL_MEDIA_TYPE } from "../common";

const portfolioSocialLinkSchema = Joi.object({
  icon: Joi.string()
    .valid(...Object.values(SOCIAL_MEDIA_TYPE))
    .default(SOCIAL_MEDIA_TYPE.INSTAGRAM)
    .optional(),
  link: Joi.string().required().allow(""),
  title: Joi.string().required().allow(""),
  ...baseApiSchema,
});

export const addPortfolioSchema = Joi.object<IPortfolio>({
  thumbnailImage: Joi.string().optional(),
  title: Joi.string().required(),
  subTitle: Joi.string().optional(),
  serviceIds: Joi.array().items(objectId()).optional(),
  isFeatured: Joi.boolean().optional(),
  link: Joi.string().optional(),
  description: Joi.string().optional(),
  images: Joi.array().items(Joi.string()).optional(),
  projectName: Joi.string().optional(),
  client: Joi.string().optional(),
  technology: Joi.string().optional(),
  date: Joi.date().optional(),
  socialLinks: Joi.array().items(portfolioSocialLinkSchema).optional(),
  ...baseApiSchema,
});

export const editPortfolioSchema = Joi.object<IPortfolio>({
  portfolioId: objectId().required(),
  thumbnailImage: Joi.string().optional().allow("", null),
  title: Joi.string().optional(),
  subTitle: Joi.string().optional().allow("", null),
  serviceIds: Joi.array().items(objectId()).optional(),
  isFeatured: Joi.boolean().optional(),
  link: Joi.string().optional().allow("", null),
  description: Joi.string().optional().allow("", null),
  images: Joi.array().items(Joi.string()).optional(),
  projectName: Joi.string().optional().allow("", null),
  client: Joi.string().optional().allow("", null),
  technology: Joi.string().optional().allow("", null),
  date: Joi.date().optional().allow(null),
  socialLinks: Joi.array().items(portfolioSocialLinkSchema).optional(),
  ...baseApiSchema,
});

export const getPortfolioSchema = Joi.object<IGetPortfolio>({
  serviceFilter: objectId().optional(),
  featuredFilter: Joi.boolean().optional(),
  ...baseCommonFieldSchema,
});
