import css from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovieCast } from "../../servises/search.js";
  
import Loader from "../Loader/Loader.jsx"
  
function MovieCast() {

  const { movieId } = useParams();
  const [loader, setLoader] = useState(false);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const takeCast = async () => {
      try {
        setLoader(true);
        const response = await searchMovieCast(movieId);
        setCast(response.cast);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    };
    takeCast();
  }, [movieId]);

  return (
    <div>
      {loader && <Loader />}
      <ul className={css.cast_list}>
        {cast ? (
          cast?.map(
            ({ character, id, name, profile_path }) =>
              profile_path && (
                <li key={id} className={css.cast_item}>
                  <img src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                    alt={name}
                  />
                  <h3>{name}</h3>
                  <p>{character}</p>
                </li>

                )
              )
          ):(
          <li>Error 404</li>
        )}
        </ul>
    </div>
  )
}

export default MovieCast
