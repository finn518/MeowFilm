import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import formatDate from "../utils";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const MovieDetails = () => {
	const baseUrl = process.env.REACT_APP_BASEURL;
	const apiKey = process.env.REACT_APP_APIKEY;
	const baseImg = process.env.REACT_APP_BASEIMGHERO;
	const { type, baseId } = useParams();

	const [Movies, setMovies] = useState({});
	const [Casts, setCast] = useState([]);
	const [Genres, setGenres] = useState([]);
	const [Studios, setStudio] = useState([]);
	const [Recomends, setRecomend] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${baseUrl}${type}/${baseId}?api_key=${apiKey}`
				);
				setMovies(response.data);
				setGenres(response.data.genres);
				setStudio(
					response.data.production_companies
						? response.data.production_companies
						: response.data.networks
				);
			} catch (err) {
				console.log(err);
			}
		};
		const fetchDataCast = async () => {
			try {
				const response = await axios.get(
					`${baseUrl}${type}/${baseId}/credits?api_key=${apiKey}`
				);
				setCast(response.data.cast.slice(0, 9));
			} catch (err) {
				console.log(err);
			}
		};
		const fetchDataRecomend = async () => {
			try {
				const response = await axios.get(
					`${baseUrl}${type}/${baseId}/recommendations?api_key=${apiKey}`
				);
				setRecomend(response.data.results);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
		fetchDataCast();
		fetchDataRecomend();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [baseId, type]);
	return (
		<div className="Main">
			<div
				className="image-details"
				style={{ backgroundImage: `url(${baseImg}/${Movies.backdrop_path})` }}
			></div>
			<motion.div
				className="details"
				initial={{ y: 100, scale: 0.8, opacity: 0 }}
				whileInView={{ y: 0, scale: 1, opacity: 1 }}
				transition={{ type: "tween" }}
			>
				<img src={`${baseImg}/${Movies.poster_path}`} alt="Movie Poster" />
				<div className="details-content">
					<h2>
						{Movies.title
							? Movies.title
							: `${Movies.name} (${Movies.original_name})`}
					</h2>
					<i className="genre-details">
						{`${new Date(
							Movies.release_date ? Movies.release_date : Movies.first_air_date
						).getFullYear()} | `}
						{Genres.map((genre, index) => (
							<span key={index}>
								{genre.name}
								{index !== Genres.length - 1 && ", "}
							</span>
						))}
						<span className="rating">{`  ★ ${
							Movies.vote_average
								? Movies.vote_average < 10
									? Movies.vote_average.toFixed(1)
									: Movies.vote_average
								: ""
						}`}</span>
					</i>
					<h4>Overview</h4>
					<p>{Movies.overview ? Movies.overview : Movies.type}</p>
				</div>
			</motion.div>
			{Casts.length > 0 && (
				<>
					<div className="tag">
						<h3>Cast</h3>
						<hr></hr>
					</div>
					<motion.div
						className="cast-details"
						initial={{ y: 100, scale: 0.8, opacity: 0 }}
						whileInView={{ y: 0, scale: 1, opacity: 1 }}
						transition={{ type: "tween" }}
					>
						{Casts.map((cast, index) => (
							<Card
								key={index}
								type={type}
								poster={`${baseImg}/${cast.profile_path}`}
								title={cast.name}
								rDate={cast.character}
							/>
						))}
					</motion.div>
				</>
			)}
			{Studios.length > 0 && (
				<>
					<div className="tag">
						<h3>Companies</h3>
						<hr></hr>
					</div>
					<motion.div
						className="companies-details"
						initial={{ y: 100, scale: 0.8, opacity: 0 }}
						whileInView={{ y: 0, scale: 1, opacity: 1 }}
						transition={{ type: "tween" }}
					>
						{Studios.map(
							(studio, index) =>
								studio.logo_path && (
									<Card
										key={index}
										poster={`${baseImg}/${studio.logo_path}`}
										title={studio.name}
										rDate={` `}
									/>
								)
						)}
					</motion.div>
				</>
			)}
			{Recomends.length > 0 && (
				<>
					<div className="tag">
						<h3>Recomendation</h3>
						<hr></hr>
					</div>
					<motion.div
						className="movie-content"
						initial={{ y: 100, scale: 0.8, opacity: 0 }}
						whileInView={{ y: 0, scale: 1, opacity: 1 }}
						transition={{ type: "tween" }}
					>
						{Recomends.map((recomend) => (
							<Card
								key={recomend.id}
								type={type}
								baseId={recomend.id}
								poster={`${baseImg}${recomend.poster_path}`}
								title={recomend.title ? recomend.title : recomend.name}
								rDate={
									recomend.release_date
										? formatDate(recomend.release_date)
										: formatDate(recomend.first_air_date)
								}
							/>
						))}
					</motion.div>
				</>
			)}
		</div>
	);
};

export default MovieDetails;
