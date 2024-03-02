import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
	const [toggle, setToggle] = useState(false);
	const [activeRoute, setActiveRoute] = useState("/");
	const location = useLocation();

	useEffect(() => {
		setActiveRoute(location.pathname);
	}, [location]);

	const activeToggle = () => {
		setToggle(!toggle);
	};

	return (
		<>
			<nav>
				<h3
					style={{
						color: activeRoute === "/" ? "red" : "white",
						opacity: toggle ? 0 : 1,
						transition: "opacity 0.3s ease",
						pointerEvents: toggle ? "none" : "auto",
					}}
				>
					MeowFilm
				</h3>
				<motion.ul
					className={toggle ? "show" : ""}
					transition={{ type: "spring" }}
					animate={{ scale: toggle ? [1, 0.5, 1] : [0.5, 1] }}
					style={{ overflow: "hidden" }}
				>
					<li>
						<Link
							to="/"
							style={{ color: activeRoute === "/" ? "red" : "white" }}
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/TVSeries"
							style={{ color: activeRoute === "/TVSeries" ? "red" : "white" }}
						>
							Series
						</Link>
					</li>
					<li>
						<Link
							to="/BoxOffice"
							style={{ color: activeRoute === "/BoxOffice" ? "red" : "white" }}
						>
							Movies
						</Link>
					</li>
				</motion.ul>
				<motion.div
					className="menu-icon"
					onClick={activeToggle}
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
				>
					{toggle ? "X" : "☰"}
				</motion.div>
			</nav>
		</>
	);
};

export default Navbar;
