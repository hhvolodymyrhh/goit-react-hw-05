
import css from "./HomePage.module.css";

import { useEffect, useState } from "react";
import { searchTrendMovies } from "../../servises/search.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Error from "../../components/Error/Error.jsx";

function HomePage() {

  const [trendResult, setTrendResult] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getTrends = async () => {
      try {
        setLoader(true);
        setError(false);
        const response = await searchTrendMovies();
        setTrendResult(response.results);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoader(false);
      }
    };
    getTrends();
  }, []);
  console.log(trendResult);

  return (
    <section className={css.homePageSection}>
      <h2 className = {css.homePageH2}>Trending today </h2>
      {loader && <Loader />}
      {!error ? <MovieList listResult={trendResult} /> : <Error />}
    </section>
  );
};

export default HomePage
