const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: String,
    author_id: String,
    category: String,
    body: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;