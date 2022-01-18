// user router
const router = require("express").Router();
// Use multer
const multer = require("multer");
// Use controller
const controller = require("./controller");

// Endpoint create new user / register
router.post("/register", multer().none(), controller.register);
// Endpoint login
router.post("/login", multer().none(), controller.login);

// Export router
module.exports = router;
