import Joi from "joi";
import { IWorkCount } from "../type";
import { objectId } from "./common";

export const addWorkCountSchema = Joi.object<IWorkCount>({
  number: Joi.string().required(),
  title: Joi.string().required(),
});

export const editWorkCountSchema = Joi.object<IWorkCount>({
  workCountId: objectId().required(),
  number: Joi.string().optional(),
  title: Joi.string().optional(),
});
