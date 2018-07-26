const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    _id: Schema.Types.ObjectId,
    author_id: String,
    category: String,
    body: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;