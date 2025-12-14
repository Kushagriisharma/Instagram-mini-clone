const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  postId: String,
  comment: String
});
module.exports = mongoose.model('Comment', commentSchema);
