const { v4: uuidv4 } = require("uuid");
const User = require("../model/User");
const UserController = {
  create: async (req, res) => {
    try {
      const id = uuidv4();

      const newUser = await User.create({
        ...req.body,
        id: id,
      });
      return res.status(200).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
};
module.exports = UserController;
