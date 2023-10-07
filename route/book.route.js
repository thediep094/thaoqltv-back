const express = require("express");
const bookRouter = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest;
    if (file.fieldname === "images") {
      dest = path.join(__dirname, "../public/uploads/images");
    }
    fs.mkdirsSync(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const filename = `${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });
const cpUpload = upload.fields([{ name: "images", maxCount: 10 }]);

const userMiddleware = require("../middleware/user.middleware");
const bookController = require("../controller/book.controller");
// api/book/create
bookRouter.post("/create", cpUpload, bookController.create);
bookRouter.get("/getall", bookController.getAllBook);

bookRouter.put("/update/:id", cpUpload, bookController.update);

bookRouter.delete("/:id", bookController.delete);

bookRouter.get(
  // "/:id",
  "/:id",
  bookController.getById
);

module.exports = bookRouter;
