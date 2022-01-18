// Use mongoose
const mongoose = require("mongoose");
// require `mongoUrl` with config
const { mongoUrl } = require("../config");

// Connection to db
mongoose.connect(mongoUrl);

// init connection mongoose to const db
const db = mongoose.connection;

// Export db
module.exports = db;
