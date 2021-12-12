const common = require("../../../lib/util");
const commonResponseType = require("../../../static/static.json");
const UserService = require("../services/users.service");

module.exports = {
  userUpdate: async (req, res, next) => {
    try {
      const updatedDetail = await UserService.updateUserService(req);

      response = common.commonResponse(
        commonResponseType.RESPONSE_SUCCESS.TRUE,
        {
          user: updatedDetail,
        },
        commonResponseType.RESPONSE_MESSAGES.USER_REGISTER_SUCCESS,
        null
      );

      res.status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS).json(response);
    } catch (error) {
      res.status(commonResponseType.HTTP_RESPONSE.HTTP_ERROR).json(error);
    }
  },

  userRemove: async (req, res, next) => {
    try {
      const removedDetail = await UserService.removeUserService(req);

      response = common.commonResponse(
        commonResponseType.RESPONSE_SUCCESS.TRUE,
        {
          user: removedDetail,
        },
        commonResponseType.RESPONSE_MESSAGES.USER_REMOVE_SUCCESS,
        null
      );

      res.status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS).json(response);
    } catch (error) {
      res.status(commonResponseType.HTTP_RESPONSE.HTTP_ERROR).json(error);
    }
  },

  getUser: async (req, res, next) => {
    const requestId = req.params.id;

    UserService.getUserService(requestId)
      .then((user) => {
        //destruct user infomation
        const { password, __v, ...info } = user._doc;

        response = common.commonResponse(
          commonResponseType.RESPONSE_SUCCESS.TRUE,
          {
            user: info,
          },
          null,
          null
        );

        res
          .status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS)
          .json(response);
      })
      .catch((err) => {
        res.status(commonResponseType.HTTP_RESPONSE.HTTP_ERROR).json(err);
      });
  },

  allUsers: async (req, res, next) => {
    try {
      const allUsers = await UserService.getAllUserService(req);

      response = common.commonResponse(
        commonResponseType.RESPONSE_SUCCESS.TRUE,
        {
          data: allUsers,
        },
        null,
        null
      );

      res.status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS).json(response);
    } catch (err) {
      res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_FORBIDDEN)
        .json(commonResponseType.RESPONSE_MESSAGES.USER_RETREIVE_FORBIDDEN);
    }
  },

  userStats: async (req, res, next) => {
    try {
      const data = await UserService.userStatService(req);

      response = common.commonResponse(
        commonResponseType.RESPONSE_SUCCESS.TRUE,
        {
          data: data,
        },
        null,
        null
      );

      return res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS)
        .json(response);
    } catch (err) {
      return res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_FORBIDDEN)
        .json(commonResponseType.RESPONSE_MESSAGES.USER_STAT_ERROR);
    }
  },
};
