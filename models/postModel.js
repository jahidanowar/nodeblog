const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
  },
  body: String,
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required"],
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Post", postSchema);
