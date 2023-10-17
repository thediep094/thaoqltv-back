const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controller/comment.controller");

commentRouter.post("/:bookId", commentController.create);
commentRouter.get("/:bookId", commentController.getAllCommentOfProduct);
commentRouter.patch("/:bookId", commentController.update);
commentRouter.delete("/:bookId", commentController.delete);

module.exports = commentRouter;
