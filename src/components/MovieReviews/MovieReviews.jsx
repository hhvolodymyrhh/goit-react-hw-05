import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovieReviews } from "../../servises/search";

import Loader from "../Loader/Loader";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const takeReviews = async () => {
      if (!movieId) {
        return;
      }
      try {
        setLoader(true);
        const response = await searchMovieReviews(movieId);
        setReviews(response.results);
console.log(response)
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false)
      }
    };

    takeReviews();
  }, [movieId])


  return (
    <div>
      {loader && <Loader />}
      <ul className={css.reviews_list}>
         {}
        {reviews ? (
          reviews?.map(({ id, author, content }) => {
           
            <li key={id} className={css.reviews_item}>
              <div className={css.author_info}>
                <h3>{author}</h3>
              </div>
              <p className={css.author_comment}>{content}</p>
            </li>
          })
        ) : (
          <li>Error</li>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews
