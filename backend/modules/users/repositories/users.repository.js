const CryptoJS = require("crypto-js");
const isEmpty = require("is-empty");
const User = require("../../../models/User");
const commonResponseType = require("../../../static/static.json");

module.exports = {
  updateUser: async (request) => {
    try {
      const updatedUser = User.findByIdAndUpdate(
        request.params.id,
        {
          $set: request.body,
        },
        { new: true }
      );
      return updatedUser;
    } catch (err) {
      res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_INTERNAL_SERVER_ERROR)
        .json(err);
    }
  },

  removeUser: async (request) => {
    if (request.user.id === request.params.id || request.user.isAdmin) {
      try {
        const deletedUser = User.findByIdAndDelete(request.params.id);
        return deletedUser;
      } catch (err) {
        res
          .status(commonResponseType.HTTP_RESPONSE.HTTP_INTERNAL_SERVER_ERROR)
          .json(err);
      }
    } else {
      res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_FORBIDDEN)
        .json(commonResponseType.RESPONSE_MESSAGES.USER_REMOVE_FORBIDDEN);
    }
  },

  getUser: async (requestId) => {
    return new Promise((resolve, reject) => {
      if (!requestId) reject("Invalid user ID");

      resolve(User.findById(requestId));
    });
  },

  getAllUsers: async (request) => {
    const query = request.query.new;

    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      return users;
    } catch (err) {
      res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_INTERNAL_SERVER_ERROR)
        .json(err);
    }
  },

  getUserStats: async (request) => {
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: {
              $month: "$createdAt",
            },
          },
        },
        {
          $group: {
            _id: "$month",
            total: {
              $sum: 1,
            },
          },
        },
      ]);
      return data;
    } catch (error) {
      res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_FORBIDDEN)
        .json(commonResponseType.RESPONSE_MESSAGES.USER_STAT_ERROR);
    }
  },
};
