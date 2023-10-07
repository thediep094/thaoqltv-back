const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    id: { type: String, required: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true, min: 8 },
    mail: { type: String, default: "" },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
