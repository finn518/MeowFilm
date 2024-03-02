import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import formatDate from "../utils";
import { motion } from "framer-motion";

const MovieList = ({
	params,
	filter1,
	filter2,
	Categoriestitle,
	type,
	page,
}) => {
	const baseUrl = process.env.REACT_APP_BASEURL;
	const apiKey = process.env.REACT_APP_APIKEY;
	const baseImg = process.env.REACT_APP_BASEIMG;
	const [MoviesFav, setMoviesFav] = useState([]);
	const [filter, setfilter] = useState(filter1);
	const [active, setActive] = useState(filter1);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`${baseUrl}${params}${filter}?page=${page}&api_key=${apiKey}`
			);
			return response.data.results;
		} catch (error) {
			console.log(error);
			return [];
		}
	};

	useEffect(() => {
		fetchData().then((res) => {
			setMoviesFav(res);
		});
	}, [filter, page]);

	return (
		<div className="Main">
			<div className="movie-filter">
				<h2>{Categoriestitle}</h2>
				<div
					className="movie-action"
					style={{
						display: filter1 === "" || filter2 === "" ? "none" : "flex",
					}}
				>
					<motion.button
						className={`movie-btn ${active === filter1 ? "active" : ""}`}
						onClick={() => {
							if (filter !== filter1) {
								setfilter(filter1);
								setActive(filter1);
							}
						}}
						whileTap={{ scale: 1.1 }}
						transition={{ type: "spring" }}
					>
						{filter1.toUpperCase().replace(/_/g, " ")}
					</motion.button>
					<motion.button
						className={`movie-btn ${active === filter2 ? "active" : ""}`}
						onClick={() => {
							if (filter !== filter2) {
								setfilter(filter2);
								setActive(filter2);
							}
						}}
						whileTap={{ scale: 1.1 }}
						transition={{ type: "spring" }}
					>
						{filter2.toUpperCase().replace(/_/g, " ")}
					</motion.button>
				</div>
			</div>
			<motion.div
				className="movie-content"
				initial={{ y: 100, scale: 0.8, opacity: 0 }}
				whileInView={{ y: 0, scale: 1, opacity: 1 }}
				transition={{ type: "tween" }}
			>
				{MoviesFav.map((movie) => (
					<Card
						key={movie.id}
						baseId={movie.id}
						type={type}
						poster={`${baseImg}${movie.poster_path}`}
						title={movie.title ? movie.title : movie.name}
						rDate={
							movie.release_date
								? formatDate(movie.release_date)
								: formatDate(movie.first_air_date)
						}
					/>
				))}
			</motion.div>
		</div>
	);
};

export default MovieList;
