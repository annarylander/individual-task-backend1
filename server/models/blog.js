const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  body: { type: String, required: true, maxLength: 140 },
  published: { type: Date, default: Date.now, required: true },
  postedByID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Blog = mongoose.model("Blog", blogSchema);

exports.Blog = Blog;
