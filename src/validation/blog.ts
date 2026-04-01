import Joi from "joi";
import { IBlog, IGetBlog } from "../type";
import { baseApiSchema, baseCommonFieldSchema, objectId } from "./common";

export const addBlogSchema = Joi.object<IBlog>({
  thumbnailImage: Joi.string().optional(),
  serviceId: objectId().optional(),
  date: Joi.date().optional(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  images: Joi.array().items(Joi.string()).optional(),
  tagLine: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  ...baseApiSchema,
});

export const editBlogSchema = Joi.object<IBlog>({
  blogId: objectId().required(),
  thumbnailImage: Joi.string().optional().allow("", null),
  serviceId: objectId().optional().allow(null),
  date: Joi.date().optional().allow(null),
  title: Joi.string().optional().allow("", null),
  description: Joi.string().optional().allow("", null),
  images: Joi.array().items(Joi.string()).optional(),
  tagLine: Joi.string().optional().allow("", null),
  tags: Joi.array().items(Joi.string()).optional(),
  ...baseApiSchema,
});

export const getBlogSchema = Joi.object<IGetBlog>({
  serviceFilter: objectId().optional(),
  ...baseCommonFieldSchema,
});
