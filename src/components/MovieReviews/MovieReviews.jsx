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
        {reviews ? (
          reviews?.map(({ id, author, content, author_details }) => {
            <li key={id} className={css.reviews_item}>
              <div className={css.author_info}>
                <div className={css.img_container}>
                  <img className={css.author_img}
                    src={
                      author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/w500/${author_details.avatar_path}`
                        : `https://th.bing.com/th/id/OIP.sAw0F4m0sAbdzDuuoMxoIgHaHa?w=980&h=980&rs=1&pid=ImgDetMain`
                    }
                    alt={author}
                  />
                </div>
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
