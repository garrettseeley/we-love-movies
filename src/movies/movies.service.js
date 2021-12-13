const knex = require("../db/connection");

// function to list reviews by movieId
function listReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId });
}

// if there is a showing parameter passed in it will run a data pull on only the movies that are showing, otherwise it will pull all movies 
function list(showing) {
  if (showing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where({ "mt.is_showing": true })
      .groupBy("mt.movie_id");
  }
  return knex("movies").select();
}

// pulls data for a specific movie determined by the movieId
function read(movieId) {
  return knex("movies").select().where({ movie_id: movieId }).first();
}

// lists all the theaters that are showing a specific movie
function listTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({ "m.movie_id": movieId })
    .andWhere({ "mt.is_showing": true });
}

module.exports = {
  list,
  read,
  listTheaters,
  listReviews,
};
