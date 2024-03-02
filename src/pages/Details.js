import MovieDetails from "../component/MovieDetails";
import { useParams } from "react-router-dom";

const Details = () => {
	const { type } = useParams();
	return (
		<section>
			<MovieDetails type={type} />
		</section>
	);
};

export default Details;
