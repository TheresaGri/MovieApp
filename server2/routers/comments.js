const mongoose = require('mongoose');
const express = require('express');
const commentsRouter = express.Router();

let bodyParser = require('body-parser');

let jsonParser = bodyParser.json();

mongoose.connect(
	'mongodb+srv://admin:Samuel@cluster0.aobh3oj.mongodb.net/cinema'
);

const Comment = require('../model/Comment.js');

commentsRouter.get('/', async (req, res) => {
	try {
		let query = {};
		let comments;
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 20;
		if (req.query['movieId'] !== undefined) {
			query = { movie_id: req.query['movieId'] };
		}

		comments = await Comment.find(query)
			.skip(page * limit)
			.limit(limit);

		res.json(comments);
	} catch (error) {
		console.error(error);
	}
});

commentsRouter.get('/:id', async (req, res) => {
	try {
		let commentById = await Comment.findById(req.params.id);
		if (commentById === null) {
			res.status(404).json({ error: 'Comment not found' });
		} else {
			res.json(commentById);
		}
	} catch (error) {
		console.error(error);
	}
});

commentsRouter.post('/', jsonParser, async (req, res) => {
	console.log(req.body);
	try {
		const name = req.body.name;
		const email = req.body.email;
		const createdAt = Date.now();
		const text = req.body.text;
		const movie_id = req.body.movie_id;
		const newComment = new Comment({
			name,
			email,
			createdAt,
			movie_id,
			text,
		});
		const savedNewComment = await newComment.save();
		res.json(savedNewComment);
	} catch (error) {
		res.status(400).json({ success: false });
	}
});

commentsRouter.patch('/:id', jsonParser, async (req, res) => {
	try {
		console.log(req.body);
		let itemToChange = req.params.id;

		const name = req.body.name;
		const email = req.body.email;
		const createdAt = Date.now();
		const text = req.body.text;
		const movie_id = req.body.movie_id;

		await Comment.findByIdAndUpdate(itemToChange, {
			name,
			email,
			createdAt,
			text,
			movie_id,
		});
		res.status(200).json({ success: true });
	} catch (err) {
		console.log(err);
	}
});

commentsRouter.delete('/:id', jsonParser, async (req, res) => {
	try {
		console.log(req.body);
		let itemToChange = req.params.id;

		await Comment.findByIdAndDelete(itemToChange);
		res.status(200).json({ success: true });
	} catch (err) {
		console.log(err);
	}
});

module.exports = commentsRouter;
