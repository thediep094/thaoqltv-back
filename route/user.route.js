const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user.controller");
const userMiddleware = require("../middleware/user.middleware");

// /api/user/create
userRouter.post("/create", userMiddleware.checkExist, userController.create);

module.exports = userRouter;
