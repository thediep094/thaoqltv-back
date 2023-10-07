const User = require("../model/User");
const mongoose = require("mongoose");

const AuthController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const checkUser = await User.findOne({ username: username });
      if (!checkUser) {
        return res.status(404).json({
          message: "Người dùng không tồn tại",
        });
      }
      if (password != checkUser.password) {
        return res.status(400).json({
          message: "Wrong password",
        });
      }
      return res.status(200).json({
        message: "Đăng nhập thành công",
        user: checkUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
};

module.exports = AuthController;
