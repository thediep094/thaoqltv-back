require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;
const router = require("./route/index");
const url = process.env.URL;
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error.message);
  }
};
connectDB();

app.use("/images", express.static("public/uploads/images"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Hello World!?");
});

http.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
