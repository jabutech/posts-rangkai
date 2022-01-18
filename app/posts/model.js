// Import mongoose
const mongoose = require("mongoose");
// Use modul `model` and `Schema` from mongoose
const { model, Schema } = mongoose;

// Create posts schema
let postsSchema = new Schema(
  {
    // Populate / Relation with collection user
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Username is required."],
    },
    //   title
    title: {
      type: String,
      required: [true, "Title is required."],
    },
  },
  { timestamps: true }
);

// Export and create model
module.exports = model("Posts", postsSchema);
