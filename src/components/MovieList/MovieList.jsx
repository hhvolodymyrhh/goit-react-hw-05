import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

function MovieList({listResult = [] }) {

  const filterResult = listResult.filter(
    ({ title }, index, arr) =>
      arr.findIndex((item) => item.title === title) === index
  );
  const location = useLocation();

  return (
    <div className={css.movieListContainer}>
      <ul className={css.movieList}>
        {filterResult.length > 0 &&
          filterResult?.map(({ id, title, backdrop_path }) => {
            return (
              backdrop_path && (
                <li className={css.movie_item} key={id}>
                  <Link className={css.movie_link} to={`/movies/${id}`} state={{from: location}}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
                      alt={title}
                    />
                    <h2 className={css.list_item_title}>{title}</h2>
                  </Link>
                </li>
              )
            );
          })}
      </ul>
    </div>
  );
};

export default MovieList
