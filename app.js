require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

/* const port = 5000;
*/
const port = process.env.APP_PORT ?? 5000;
const { hashPassword } = require("./auth.js")

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie)
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

const usersHandlers=require("./usersHandlers");

app.get("/api/users",usersHandlers.getUsers)
app.get("/api/users/:id",usersHandlers.getUsersById)
app.post("/api/users",hashPassword,usersHandlers.postUsers)
app.put("/api/users/:id", usersHandlers.updateUsers);
app.delete("/api/users/:id", usersHandlers.deleteUsers);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const {validateMovie} = require("./validator")

app.post("/api/movies",validateMovie,movieHandlers.postMovie)