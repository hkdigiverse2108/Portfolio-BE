import Joi from "joi";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";
import { ICommonGetValidate, ISkill } from "../type";

export const addSkillSchema = Joi.object<ISkill>({
  image: Joi.string().required(),
  title: Joi.string().required(),
  percentage: Joi.number().required(),
  ...baseApiSchema,
});

export const editSkillSchema = Joi.object<ISkill>({
  skillId: objectId().required(),
  image: Joi.string().optional(),
  title: Joi.string().optional(),
  percentage: Joi.number().optional(),
  ...baseApiSchema,
});

export const getSkillSchema = Joi.object<ICommonGetValidate>({
  ...baseCommonFieldSchema,
});
