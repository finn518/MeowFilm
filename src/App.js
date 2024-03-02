import "./App.css";
import Navbar from "../src/component/Navbar";
import Footer from "./component/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TV from "./pages/TV";
import Details from "./pages/Details";
import BoxOffice from "./pages/BoxOffice";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/TVSeries" element={<TV />} />
				<Route path="/Details/:type/:baseId" element={<Details />} />
				<Route path="/BoxOffice" element={<BoxOffice />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
