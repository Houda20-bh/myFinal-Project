const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:'https://thumbs.dreamstime.com/b/white-stone-words-positive-vibes-smile-face-color-glitter-boke-background-positive-vibes-stone-117353582.jpg',
    },
    isEdited: false,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", blogSchema);