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

/* --------------------------------------
              Validate
-------------------------------------- */

export type IValidate = { error: Joi.ValidationError };

export type ICommonIdValidate = IValidate & { value: { id: string } };

export type ICommonGetValidate = { page?: number; limit?: number; search?: string; activeFilter?: boolean };

export type IGetCommonValidate = IValidate & { value: ICommonGetValidate };

/* --------------------------------------
              Criteria
-------------------------------------- */

export type IRegexFilter = { $regex?: string; $options?: string };

export type ICriteria<T = {}> = { isDeleted: boolean; isActive?: boolean } & T;

export type ICommonCriteria = ICriteria<{ name?: IRegexFilter }>;
