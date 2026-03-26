import Joi from "joi";
import { commonContactSchema, objectId } from "./common";

export const registerSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
  profileImage: Joi.string().optional().allow(""),
  role: objectId().optional(),
  phoneNo: commonContactSchema.optional(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

export const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
});

export const updatePasswordSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

export const resetPasswordSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

export const verifyOtpSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  otp: Joi.string().required(),
});

export const resendOtpSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
});
