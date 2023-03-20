const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
