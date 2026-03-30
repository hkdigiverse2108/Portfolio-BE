import Joi from "joi";
import mongoose from "mongoose";

export const objectId = () =>
  Joi.string()
    .custom((value, helpers) => {
      if (!mongoose?.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId Validation")
    .allow(null);

export const baseApiSchema = {
  isActive: Joi.boolean().optional(),
};

export const commonContactSchema = Joi.object().keys({
  countryCode: Joi.string().optional().allow("", null),
  number: Joi.string()
    .pattern(/^\d{6,15}$/)
    .optional()
    .allow("", null),
});

export const commonIdSchema = Joi.object({
  id: objectId().required(),
});

export const baseCommonFieldSchema = {
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  search: Joi.string().optional(),
  activeFilter: Joi.boolean().optional(),
};

export const getCommonSchema = Joi.object({
  ...baseCommonFieldSchema,
});
