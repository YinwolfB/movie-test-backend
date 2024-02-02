const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


Movie.belongsToMany(Genre, {through: 'MoviesGenres'});
Movie.belongsToMany(Actor, {through: 'MoviesActors'});
Movie.belongsToMany(Director, {through: 'MoviesDirectors'});

Genre.belongsToMany(Movie, {through: 'MoviesGenres'});
Actor.belongsToMany(Movie, {through: 'MoviesActors'});
Director.belongsToMany(Movie, {through: 'MoviesDirectors'});