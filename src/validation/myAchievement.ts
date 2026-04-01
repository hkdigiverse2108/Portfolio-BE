import Joi from "joi";
import { ICommonGetValidate, IMyAchievement } from "../type";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";

export const addMyAchievementSchema = Joi.object<IMyAchievement>({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  link: Joi.string().optional(),
  image: Joi.string().optional(),
  btnTitle: Joi.string().optional(),
  btnLink: Joi.string().optional(),
  ...baseApiSchema,
});

export const editMyAchievementSchema = Joi.object<IMyAchievement>({
  myAchievementId: objectId().required(),
  title: Joi.string().optional().allow("", null),
  description: Joi.string().optional().allow("", null),
  link: Joi.string().optional().allow("", null),
  image: Joi.string().optional().allow("", null),
  btnTitle: Joi.string().optional().allow("", null),
  btnLink: Joi.string().optional().allow("", null),
  ...baseApiSchema,
});

export const getMyAchievementSchema = Joi.object<ICommonGetValidate>({
  ...baseCommonFieldSchema,
});
