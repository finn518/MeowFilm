import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import axios from "axios";

const Hero = () => {
	const [genres, setGenres] = useState([]);
	const [MoviesContent, setMoviesContent] = useState([]);
	const [slides, setSlides] = useState([]);
	const baseUrl = process.env.REACT_APP_BASEURL;
	const apiKey = process.env.REACT_APP_APIKEY;
	const baseImg = process.env.REACT_APP_BASEIMGHERO;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${baseUrl}trending/movie/day?api_key=${apiKey}`
				);
				setMoviesContent(response.data.results.slice(0, 5));
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const getGenre = async () => {
			try {
				const response = await axios.get(
					`${baseUrl}genre/movie/list?api_key=${apiKey}`
				);
				setGenres(response.data.genres);
			} catch (err) {
				console.log(err);
			}
		};
		getGenre();
	}, []);

	useEffect(() => {
		const updatedSlides = MoviesContent.map((movie) => {
			const movieGenres = movie.genre_ids.map((genreId) => {
				const genre = genres.find((g) => g.id === genreId);
				return genre ? genre.name : "Unknown Genre";
			});
			const rating = movie.vote_average.toFixed(1);

			let desc = movie.overview;
			if (desc.split(" ").length > 25) {
				desc = `${desc.split(" ").slice(0, 50).join(" ")} etc`;
			}
			return {
				imageUrl: `${baseImg}${movie.backdrop_path}`,
				title: movie.title,
				description: desc,
				genre: movieGenres.join(", "),
				rating: rating,
			};
		});

		setSlides(updatedSlides);
	}, [MoviesContent, genres, baseUrl, baseImg]);

	return (
		<div>
			{slides.length > 0 ? <HeroSection slides={slides} /> : <p>Loading...</p>}
		</div>
	);
};

export default Hero;
