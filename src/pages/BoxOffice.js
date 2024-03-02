import { motion } from "framer-motion";
import { useState, useRef } from "react";
import MovieList from "../component/MovieList";

const BoxOffice = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const movieListRef = useRef(null);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		scrollToTop();
	};

	const scrollToTop = () => {
		if (movieListRef.current) {
			movieListRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section>
			<motion.div
				className="movie-specific"
				initial={{ y: 100, scale: 0.8, opacity: 0 }}
				whileInView={{ y: 0, scale: 1, opacity: 1 }}
				transition={{ type: "tween" }}
			>
				<div ref={movieListRef}>
					{" "}
					<MovieList
						page={currentPage}
						params="movie/"
						type="movie"
						filter1="top_rated"
						filter2=""
						Categoriestitle="Box Office"
					/>
				</div>
			</motion.div>
			<div className="page">
				{[1, 2, 3, 4, 5].map((pageNumber) => (
					<a
						key={pageNumber}
						href="#"
						onClick={() => handlePageChange(pageNumber)}
					>
						{pageNumber}
					</a>
				))}
			</div>
		</section>
	);
};

export default BoxOffice;
