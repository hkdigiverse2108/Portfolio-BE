import { apiResponse, HTTP_STATUS } from "../../common";
import { userModel } from "../../database";
import { getFirstMatch, reqInfo, responseMessage } from "../../helper";

export const getUserSection = async (req, res) => {
  reqInfo(req);
  let { user } = req.headers;
  try {
    let userdata = await getFirstMatch(userModel, { _id: user, isDeleted: false }, {}, {});
    return res.status(HTTP_STATUS.OK).json(new apiResponse(HTTP_STATUS.OK, responseMessage?.getDataSuccess("User"), userdata, {}));
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new apiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage.internalServerError, {}, {}));
  }
};
