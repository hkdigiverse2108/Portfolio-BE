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
  year: Joi.number().optional().allow(null),
  title: Joi.string().optional().allow("", null),
  subTitle: Joi.string().optional().allow("", null),
  ...baseApiSchema,
});

export const getWorkExperienceSchema = Joi.object<ICommonGetValidate>({
  ...baseCommonFieldSchema,
});