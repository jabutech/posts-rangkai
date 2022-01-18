// user router
const router = require("express").Router();
// Use multer
const multer = require("multer");
// Use controller
const controller = require("./controller");
// Use middleware
const { isLoginUser } = require("../middleware");

// Endpoint
// Create new posts
router.post("/posts", isLoginUser, multer().none(), controller.create);
// View posts
router.get("/posts", isLoginUser, controller.viewPosts);
// Delete posts
router.delete("/posts/:id", isLoginUser, controller.deletePosts);

// Export router
module.exports = router;
