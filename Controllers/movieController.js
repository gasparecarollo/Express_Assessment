const express = require('express');
const movies = express.Router();
const moviesArr = require("../data/movies");

movies.get("/", (request, response) => {
    try {
        response.status(202).json(moviesArr)
    } catch (error) {
        response.status(404).json({ error: error })
    }
})

movies.get("/:id", (request, response) => {
    try {
        const { id } = request.params;
        const movie = moviesArr.find(movie =>
            movie.id === Number(id));
        if (movie) {
            response.status(200).json(movie)
        } else {
            throw "Movie could not be found"
        }
    } catch (error) {
        response.status(404).json({ error: error })
    }
})


movies.post("/", (request, response) => {

    try {
        const movie = request.body;
        if (movie.id) {

            moviesArr.push(movie);
            response.status(200).json(moviesArr[moviesArr.length - 1]);
        } else {
            throw "Could not create movie, please provide data."
        }
    } catch (error) {
        response.status(400).json({ error: error });
    }
})

movies.put("/:id", (request, response) => {
    try {
        const { id } = request.params;
        const movie = request.body;
        const index = moviesArr.findIndex((movie) => {
            movie.id === Number(id);
        })
        if (index !== -1) {
            moviesArr.splice(index, 1, movie)
            response.status(200).json(moviesArr[index]);
        } else {
            throw "Could not update movie!"
        }

    } catch (error) {
        response.status(400).json({ error: error });
    }
})

movies.delete("/:id", (request, response) => {

    try {
        const { id } = request.params;
        const index = moviesArr.findIndex((movie) =>
            movie.id === Number(id)
        )
        if (index !== -1) {
            moviesArr.splice(index, 1)
            response.status(200).json(moviesArr)
        } else {
            throw "Movie could not be deleted"
        }
    } catch (error) {
        response.status(400).json({ error: error });
    }
});

module.exports = movies;