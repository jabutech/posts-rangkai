// Require package dotenv
const dotenv = require("dotenv");
// Use config from dotenv
dotenv.config();

// Export environtment from file `.env`
module.exports = {
  serviceName: process.env.SERVICE_NAME,
  mongoUrl: process.env.MONGO_URL,
  secretKey: process.env.SECRET_KEY,
};
