import Joi from "joi";
import { IAwards } from "../type";
import { baseApiSchema, objectId } from "./common";

export const addAwardsSchema = Joi.object<IAwards>({
  image: Joi.string().optional(),
  icon: Joi.string().optional(),
  title: Joi.string().optional(),
  date: Joi.date().optional(),
  ...baseApiSchema,
});

export const editAwardsSchema = Joi.object<IAwards>({
  awardsId: objectId().required(),
  image: Joi.string().optional(),
  icon: Joi.string().optional(),
  title: Joi.string().optional(),
  date: Joi.date().optional(),
  ...baseApiSchema,
});
