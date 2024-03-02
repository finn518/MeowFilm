import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ type, baseId, poster, title, rDate }) => {
	return (
		<motion.div
			className="card-container"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			<Link to={`/Details/${type}/${baseId}`}>
				{" "}
				<img className="poster" src={poster} alt={title} />
			</Link>
			<div className="card-content">
				<Link to={`/Details/${type}/${baseId}`}>{title}</Link> <i>{rDate}</i>
			</div>
		</motion.div>
	);
};

export default Card;
