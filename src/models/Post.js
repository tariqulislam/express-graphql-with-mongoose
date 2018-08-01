const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author_id: Schema.Types.ObjectId,
    title: String,
    category: String,
    body: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;