import Joi from "joi";
import { IAwards, ICommonGetValidate } from "../type";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";

export const addAwardsSchema = Joi.object<IAwards>({
  image: Joi.string().optional(),
  iconImage: Joi.string().optional(),
  title: Joi.string().optional(),
  date: Joi.date().optional(),
  ...baseApiSchema,
});

export const editAwardsSchema = Joi.object<IAwards>({
  awardsId: objectId().required(),
  image: Joi.string().optional().allow("", null),
  iconImage: Joi.string().optional().allow("", null),
  title: Joi.string().optional().allow("", null),
  date: Joi.date().optional().allow(null),
  ...baseApiSchema,
});

export const getAwardsSchema = Joi.object<ICommonGetValidate>({
  ...baseCommonFieldSchema,
});