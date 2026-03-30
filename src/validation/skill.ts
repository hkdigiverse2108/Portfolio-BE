import Joi from "joi";
import { objectId } from "./common";

export const addSkillSchema = Joi.object({
  image: Joi.string().required(),
  title: Joi.string().required(),
  percentage: Joi.number().required(),
});

export const editSkillSchema = Joi.object({
  skillId: objectId().required(),
  image: Joi.string().optional(),
  title: Joi.string().optional(),
  percentage: Joi.number().optional(),
});
