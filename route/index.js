const express = require("express");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const bookRouter = require("./book.route");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/book", bookRouter);

module.exports = router;
