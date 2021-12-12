const router = require("express").Router();
const usersController = require("../controllers/users.controller");

/* PUT user update */
router.put("/:id", usersController.userUpdate);

/* GET single user */
router.get("/find/:id", usersController.getUser);

/* GET all users */
router.get("/", usersController.allUsers);

module.exports = router;
