import Joi from "joi";
import { ICommonGetValidate, IWorkExperience } from "../type";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";

export const addWorkExperienceSchema = Joi.object<IWorkExperience>({
  year: Joi.number().required(),
  title: Joi.string().required(),
  subTitle: Joi.string().required(),
  ...baseApiSchema,
});

export const editWorkExperienceSchema = Joi.object<IWorkExperience>({
  workExperienceId: objectId().required(),
  year: Joi.number().optional(),
  title: Joi.string().optional(),
  subTitle: Joi.string().optional(),
  ...baseApiSchema,
});

export const getWorkExperienceSchema = Joi.object<ICommonGetValidate>({
  ...baseCommonFieldSchema,
});