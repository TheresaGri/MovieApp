const express = require('express');
const app = express();
const moviesRouter = require('./routers/movies.js');
const commentsRouter = require('./routers/comments.js');

app.use('/api/movies', moviesRouter);
app.use('/api/comments', commentsRouter);

let PORT = 3001;

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
