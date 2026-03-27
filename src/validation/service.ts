import Joi from "joi";
import { IService } from "../type";
import { baseApiSchema, objectId } from "./common";

export const addServiceSchema = Joi.object<IService>({
  name: Joi.string().required(),
  ...baseApiSchema,
});

export const editServiceSchema = Joi.object<IService>({
  name: Joi.string().required(),
  serviceId: objectId().required(),
  ...baseApiSchema,
});
