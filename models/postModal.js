const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide a post title!"],
    min: [3, "The post title can not be less than 3 letters!"],
    max: [50, "The post title can not be more than 50 letters!"],
  },

  photo: {
    secure_url: {
      type: String,
      default: "",
    },
    public_id: {
      type: String,
      default: "",
      // required: [true, "user photo can not be empty"],
    },

    required: [true, "please provide a post photo!"],
  },

  description: {
    type: String,

    min: [3, "The post description can not be less than 3 letters!"],
    max: [220, "The post description can not be more than 220 letters!"],
  },

  createdAt: {
    type: Date,

    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports.Post = Post;
