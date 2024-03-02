import React from "react";
import MovieList from "./MovieList";

const MovieMain = () => {
	return (
		<>
			<MovieList
				page="1"
				type="movie"
				params="trending/movie/"
				filter1="day"
				filter2="week"
				Categoriestitle="Trending"
			/>
			<MovieList
				page="1"
				type="movie"
				params="movie/"
				filter1="popular"
				filter2="upcoming"
				Categoriestitle="Movie"
			/>
			<MovieList
				page="1"
				type="tv"
				params="tv/"
				filter1="popular"
				filter2="on_the_air"
				Categoriestitle="TV Series"
			/>
		</>
	);
};

export default MovieMain;
