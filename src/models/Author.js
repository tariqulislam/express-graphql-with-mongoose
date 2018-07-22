const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    id: String,
    name: String,
    email: {type: String, required: true, unique: true}
});

const Author = mongoose.model('Author', authorSchema);

module.exports = User;
