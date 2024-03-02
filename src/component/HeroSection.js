import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const HeroSection = ({ slides }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		if (slides.length > 0) {
			const slideInterval = setInterval(() => {
				setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
			}, 10000);
			return () => clearInterval(slideInterval);
		}
	}, [slides]);

	const { imageUrl, title, description, genre, rating } = slides[currentSlide];

	const nextSlide = () => {
		setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
	};

	const prevSlide = () => {
		setCurrentSlide(
			(prevSlide) => (prevSlide - 1 + slides.length) % slides.length
		);
	};

	return (
		<div
			className="image-container"
			style={{ backgroundImage: `url(${imageUrl})` }}
		>
			<div className="gradient-layer"></div>
			<motion.div
				className="content"
				initial={{ y: 100, scale: 0.8, opacity: 0 }}
				whileInView={{ y: 0, scale: 1, opacity: 1 }}
				transition={{ type: "tween" }}
			>
				<h2 className="title">{title}</h2>
				<div className="genre-and-rating">
					<p className="rating">{rating}</p>
					<div className="genre">
						<p>{genre}</p>
					</div>
				</div>
				<p className="desc">{description}</p>
			</motion.div>
			<motion.div
				className="arrows"
				initial={{ y: 100, scale: 0.8, opacity: 0 }}
				whileInView={{ y: 0, scale: 1, opacity: 1 }}
				transition={{ type: "tween" }}
			>
				<button onClick={prevSlide}> {`<`} </button>
				<button onClick={nextSlide}> {`>`} </button>
			</motion.div>
		</div>
	);
};

export default HeroSection;
