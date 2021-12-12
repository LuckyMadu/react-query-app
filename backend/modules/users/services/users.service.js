const userRepo = require("../repositories/users.repository");

module.exports = {
  updateUserService: (request) => userRepo.updateUser(request),
  removeUserService: (request) => userRepo.removeUser(request),
  getUserService: (requestId) => userRepo.getUser(requestId),
  getAllUserService: (request) => userRepo.getAllUsers(request),
  userStatService: (request) => userRepo.getUserStats(request),
};
