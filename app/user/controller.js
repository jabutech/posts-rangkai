// Use model user
const User = require("./model");
// Import jwt
const jwt = require("jsonwebtoken");
// Import config
const config = require("../../config");

module.exports = {
  register: async (req, res, next) => {
    try {
      // Get payload
      let { username = "", isAdmin = "" } = req.body;

      //   Init payload epmty object
      const payload = {};

      //   If username is not empty set to payload
      if (username.length) payload.username = username;
      //   If isAdmin is not empty set to payload
      if (isAdmin) payload.isAdmin = isAdmin;

      //   Create new object user
      let user = new User(payload);
      //   Save to db
      await user.save();
      //   Return response after success save data
      return res.status(201).json({
        message: "SUCCESS",
        data: user,
      });
    } catch (err) {
      // Handle error from mongoose
      if (err && err.name === "ValidationError") {
        return res.status(422).json({
          message: "ERROR",
          data: err.errors,
        });
      }
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      // Get username from request body client
      let { username } = req.body;
      //   Search username on collection user
      let user = await User.findOne({ username });
      //   Check if the user exists and check username in collection user is suitable with username send from client request
      if (user && user.username === username) {
        // Yes create token
        const token = jwt.sign(
          {
            user: {
              id: user._id,
              username: user.username,
              isAdmin: user.isAdmin,
            },
          },
          // Use secretKey
          config.secretKey,
          // Expired token 5 hours
          { expiresIn: "1days" }
        );

        //   Return status success and token
        return res.status(200).json({
          message: "SUCCESS",
          token,
        });
      } else {
        // If user not exist, return response error
        return res.status(403).json({
          message: "ERROR",
          data: "Username not found.",
        });
      }
    } catch (err) {
      // Handle error
      res.status(500).json({
        message: "ERROR",
        data: err.message || `Internal server error.`,
      });
    }
    next();
  },
};
