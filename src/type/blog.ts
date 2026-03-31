import { Schema } from "mongoose";
import { IBase, ICommonCriteria, ICommonGetValidate, IValidate } from "./base";

export interface IBlog extends IBase {
  thumbnailImage?: string;
  serviceId?: Schema.Types.ObjectId;
  date?: Date;
  title?: string;
  description?: string;
  images?: string[];
  tagLine?: string;
  tags?: string[];
  blogId?: Schema.Types.ObjectId;
}

export type IBlogValidate = IValidate & { value: IBlog };

export type IGetBlog = ICommonGetValidate & { serviceFilter?: Schema.Types.ObjectId };

export type IGetBlogValidate = IValidate & { value: IGetBlog };

export type IBlogCriteria = ICommonCriteria & { serviceId: { $in: Schema.Types.ObjectId } };
