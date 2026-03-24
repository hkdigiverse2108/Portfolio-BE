import Joi from "joi";
import { Document, Schema } from "mongoose";

export interface IBase extends Document {
  companyId: Schema.Types.ObjectId;
  branchId?: Schema.Types.ObjectId;
  createdBy?: Schema.Types.ObjectId;
  updatedBy?: Schema.Types.ObjectId;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPhoneNo {
  countryCode: string;
  number: string;
}

export interface IValidate {
  error: Joi.ValidationError;
}
