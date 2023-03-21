const mongoose = require("mongoose");
const express = require("express");
const moviesRouter = express.Router();

mongoose.connect(
  "mongodb+srv://theresagri:XcsNUtaP9GJdX3i@cluster0.jycu5sj.mongodb.net/cinema"
);

const Film = require("../model/Film.js");

moviesRouter.get("/", async (req, res) => {
  try {
    let query = {};
    let movies;
    let sorting = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    if (req.query["year"] !== undefined) {
      query = { year: req.query["year"] };
    }
    if (req.query["title"] !== undefined) {
      query = { name: { $regex: req.query["title"], $options: "i" } };
    }

    if (req.query["sortAscending"] !== undefined) {
      if (req.query["sortAscending"] === "year") {
        sorting = { year: 1 };
      }
    }
    if (req.query["sortDescending"] !== undefined) {
      if (req.query["sortDescending"] === "year") {
        sorting = { year: -1 };
      }
    }

    movies = await Film.find(query)
      .sort(sorting)
      .skip(page * limit)
      .limit(limit);

    res.json(movies);
  } catch (error) {
    console.error(error);
  }
});

moviesRouter.get("/:id", async (req, res) => {
  try {
    let movieById = await Film.findById(req.params.id);
    if (movieById === null) {
      res.status(404).json({ error: "Movie not found" });
    } else {
      res.json(movieById);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = moviesRouter;
