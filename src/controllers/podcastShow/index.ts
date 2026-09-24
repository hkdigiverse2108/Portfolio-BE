import { apiResponse, HTTP_STATUS } from "../../common";
import { podcastShowModel } from "../../database";
import { getFirstMatch, reqInfo, responseMessage, updateData } from "../../helper";
import { IPodcastShowValidate } from "../../type";
import { updatePodcastShowSchema } from "../../validation";

export const updatePodcastShow = async (req, res) => {
  reqInfo(req);
  try {
    const { user } = req.headers;
    const { error, value }: IPodcastShowValidate = await updatePodcastShowSchema.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).json(new apiResponse(HTTP_STATUS.BAD_REQUEST, error?.details[0]?.message, {}, {}));

    value.createdBy = user?._id;
    value.updatedBy = user?._id;

    let existing = await getFirstMatch(podcastShowModel, { isDeleted: false }, {}, {});
    let response;
    if (existing) {
      response = await updateData(podcastShowModel, { _id: existing._id }, value, { new: true });
    } else {
      value.isDeleted = false;
      response = await podcastShowModel.create(value);
    }

    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.updateDataSuccess("Podcast Showcase"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};

export const getPodcastShow = async (req, res) => {
  reqInfo(req);
  try {
    let response = await getFirstMatch(podcastShowModel, { isDeleted: false }, {}, {});
    if (!response) {
      // Create initial document with default values if none exists
      response = await podcastShowModel.create({
        tagline: "GUJARAT'S #1 PODCAST",
        title: "THE JAY THADESHWAR SHOW",
        description:
          "Jay runs Gujarat’s most successful podcast, which he grew from 0 to 300 Million+ views in less than a year. He engages in deep conversations about life, business, growth, spirituality, art, and much more.",
        row1Images: [],
        row2Images: [],
      });
    }
    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("Podcast Showcase"), response, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};
