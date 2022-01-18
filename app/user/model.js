// Import mongoose
const mongoose = require("mongoose");
// Use modul `model` and `Schema` from mongoose
const { model, Schema } = mongoose;

// Create user schema
let userSchema = new Schema(
  {
    //   Username property
    username: {
      type: String,
      required: [true, "Username is required."],
    },

    // isAdmin property
    isAdmin: {
      type: Boolean,
      //   Default set false
      default: false,
    },
  },
  { timestamps: true }
);

// Username validation unique
userSchema.path("username").validate(
  async function (value) {
    try {
      const count = await this.model("User").count({ username: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} already registered.`
);

// Export and create model
module.exports = model("User", userSchema);
