const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const Film = require('./model/Film.js');
const Comment = require('./model/Comment.js');
const express = require('express');
const app = express();
app.use(express.json());

const batchSize = 10;
const sourceUri = 'mongodb+srv://theresagri:XcsNUtaP9GJdX3i@cluster0.jycu5sj.mongodb.net/movies?retryWrites=true&w=majority';
const destUri = 'mongodb+srv://theresagri:XcsNUtaP9GJdX3i@cluster0.jycu5sj.mongodb.net/cinema?retryWrites=true&w=majority';

async function migrateMovies() {
  const sourceClient = await MongoClient.connect(sourceUri, { useUnifiedTopology: true });
  const sourceDb = sourceClient.db();

  const destClient = await mongoose.connect(destUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const destDb = destClient.connection;

  const collection = sourceDb.collection('movies');

  let skip = 0;
  let movies = await collection.find({
    poster: { $exists: true },
    type: 'movie',
    'imdb.rating': { $gte: 8.5 }
  }).skip(skip).limit(batchSize).toArray();

  while (movies.length > 0) {
    for (const movie of movies) {
      const newFilm = new Film({
        _id: movie._id,
        name: movie.title,
        plot: movie.plot,
        genres: movie.genres,
        duration: movie.runtime,
        year: movie.year,
        imdbRating: movie.imdb.rating,
        poster: movie.poster
      });

      await newFilm.save();

      const commentsCollection = sourceDb.collection('comments');
      const comments = await commentsCollection.find({
        movie_id: movie._id
      }).toArray();

      for (const comment of comments) {
        const newComment = new Comment({
          name: comment.name,
          text: comment.text,
          movie: newFilm._id
        });

        await newComment.save();
      }
    }

    skip += batchSize;
    movies = await collection.find({
      poster: { $exists: true },
      type: 'movie',
      'imdb.rating': { $gte: 8 }
    }).skip(skip).limit(batchSize).toArray();
  }

  await sourceClient.close();
  await destDb.close();
  await destClient.disconnect();
}

migrateMovies().then(() => {
  console.log('Migration completed successfully.');
}).catch((error) => {
  console.error('An error occurred during migration:', error);
});
