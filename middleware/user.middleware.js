const User = require("../model/User");

const userMiddleware = {
  isAdmin: (req, res, next) => {
    if (req.body && req.body.role == "admin") {
      next();
    } else {
      res.status(403).json({ message: "Bạn không có quyền truy cập." });
    }
  },
  checkExist: async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findOne({ username: username });
    // console.log(user);
    if (user) {
      return res.status(400).json({
        message: "Username đã được sử dụng",
      });
    }
    next();
  },
};

module.exports = userMiddleware;
