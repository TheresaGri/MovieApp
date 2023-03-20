const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  plot: { type: String },
  genres: { type: [String], required: true },
  duration: { type: Number },
  year: { type: Number },
  imdbRating: { type: Number },
  poster: { type: String },
});

module.exports = mongoose.model('Film', filmSchema);
