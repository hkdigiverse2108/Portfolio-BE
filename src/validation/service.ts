import Joi from "joi";
import { IService } from "../type";
import { objectId } from "./common";

export const addServiceSchema = Joi.object<IService>({
  name: Joi.string().required(),
});

export const editServiceSchema = Joi.object<IService>({
  name: Joi.string().required(),
  serviceId: objectId().required(),
});
