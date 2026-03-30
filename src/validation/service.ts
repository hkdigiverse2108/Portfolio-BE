import Joi from "joi";
import { ICommonGetValidate, IService } from "../type";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";

export const addServiceSchema = Joi.object<IService>({
  name: Joi.string().required(),
  ...baseApiSchema,
});

export const editServiceSchema = Joi.object<IService>({
  name: Joi.string().required(),
  serviceId: objectId().required(),
  ...baseApiSchema,
});

export const getServiceSchema = Joi.object<ICommonGetValidate>({
  ...baseCommonFieldSchema,
});
