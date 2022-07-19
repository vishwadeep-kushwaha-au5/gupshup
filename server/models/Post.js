const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  photo:{
    type: String,
  },
  desc:{
    type: String,
    required: true
  },
  likes: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  strict: true,
  collection: 'Post'
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
