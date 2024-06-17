const express = require('express');
const app = express();
const moviesController = require("./Controllers/movieController");

app.use(express.json())

app.use("/movies", moviesController)

app.get("/", (request, response) => {
    response.send("Welcome to the Movies Database!")
})

app.get("*", (request, response) => {
    response.status(404).send("Sorry, the page you requested does not exist.")
})



module.exports = app;