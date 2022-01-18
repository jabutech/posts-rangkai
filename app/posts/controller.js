// Use model
const Posts = require("./model");
const mongoose = require("mongoose");

module.exports = {
  // Create new posts
  create: async (req, res, next) => {
    try {
      // Get title from body
      const { title = "" } = req.body;
      //   Init payload empty object
      const payload = {};

      //   If title is not empty set to payload
      if (title.length) payload.title = title;
      //   Set idUser from id user login
      payload.idUser = req.user._id;

      //   Create new object posts
      let posts = new Posts(payload);
      //   Save to db
      await posts.save();
      //   Return response after success save data
      return res.status(201).json({
        message: "SUCCESS",
        data: posts,
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

  // View posts
  viewPosts: async (req, res, next) => {
    try {
      // Get all post
      const posts = await Posts.find({
        idUser: {
          // Not in id user is login
          $nin: [mongoose.Types.ObjectId(req.user.id)],
        },
      })
        // Populate username
        .populate("idUser", "username -_id");

      // Create new response
      let results = [];
      for (i = 0; i < posts.length; i++) {
        results.push({
          idPosts: posts[i]._id,
          username: posts[i].idUser.username,
          title: posts[i].title,
        });
      }

      // return response
      return res.status(200).json({
        message: "SUCCESS",
        data: results,
      });
    } catch (err) {
      // Handle error
      res.status(500).json({
        message: "ERROR",
        data: err.message || `Internal server error.`,
      });
    }
    next();
  },

  // Delete Posts
  deletePosts: async (req, res, next) => {
    try {
      console.log(req.user.isAdmin === true);
      // Check user login is admin
      if (req.user.isAdmin === true) {
        // Yes, Can Delete post
        // Delete posts by id send from paramater client request
        await Posts.deleteOne({ _id: req.params.id });
        // Return response
        return res.status(200).json({
          message: "SUCCESS",
          data: "Posts has been deleted.",
        });
      } else {
        // No, return response Not allowed to delete this post
        return res.status(422).json({
          message: "ERROR",
          data: "Not allowed to delete this post.",
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
