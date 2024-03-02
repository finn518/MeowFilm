import { motion } from "framer-motion";

const Footer = () => {
	return (
		<footer>
			<motion.div
				className="footer-logo"
				initial={{ y: 100, scale: 0.8, opacity: 0 }}
				whileInView={{ y: 0, scale: 1, opacity: 1 }}
				transition={{ type: "tween" }}
			>
				<img src="/tmdb.jpg" />
			</motion.div>
			<motion.div
				className="footer-content"
				initial={{ y: 100, scale: 0.8, opacity: 0 }}
				whileInView={{ y: 0, scale: 1, opacity: 1 }}
				transition={{ type: "tween" }}
			>
				<p>
					Seluruh informasi film ini didapatkan dari TMDb API (The Movie
					Database).
				</p>
				@2024
			</motion.div>
		</footer>
	);
};

export default Footer;
