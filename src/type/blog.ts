import mongoose from "mongoose";
import { IBase, ICommonCriteria, ICommonGetValidate, IValidate } from "./base";

export interface IBlog extends IBase {
  thumbnailImage?: string;
  serviceId?: mongoose.Types.ObjectId;
  date?: Date;
  title?: string;
  description?: string;
  images?: string[];
  tagLine?: string;
  tags?: string[];
  blogId?: string;
}

export type IBlogValidate = IValidate & { value: IBlog };

export type IGetBlog = ICommonGetValidate & { serviceFilter?: string };

export type IGetBlogValidate = IValidate & { value: IGetBlog };

export type IBlogCriteria = ICommonCriteria & { serviceId: { $in: mongoose.Types.ObjectId } };
