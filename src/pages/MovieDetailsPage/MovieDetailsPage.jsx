import css from "./MovieDetailsPage.module.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useParams,Link } from "react-router-dom";
import { searchMovieById } from "../../servises/search.js";

import Loader from "../../components/Loader/Loader";

function MovieDetailsPage() {

  const { movieId } = useParams();

  const [filmPageInfo, setfilmPageInfo] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from || "/");

  useEffect(() => {
    const resultById = async () => {
      try {
        setLoader(true);
        if (movieId) {
          const response = await searchMovieById(movieId);
          setfilmPageInfo(response);
        }
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoader(false);
      }
    };
    resultById();
  }, [movieId]);

  const { title, backdrop_path, overview, genres, vote_average } = filmPageInfo;

  return (
    <>
      {loader && <Loader />}
      {!error ? (
        <section className={css.filmDetails}>
          <Link to={backLinkHref.current} className={css.goBack}>
          Go back
          </Link>
<div className={css.filmDetailsInner}>
            <div className={css.imgContainer}>
              {backdrop_path ? (
                <img
                  className={css.imgFilm}
                  src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
                  alt="title"
                />
              ) : (
                <img
                  className={css.imgFilm}
                  src={`https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg`}
                  alt="title"
                />
              )}
            </div>
            <div className={css.filmInfo}>
              <h1 className={css.film_title}>{title}</h1>
              <p className={css.user_score}>
                User score: <span>{vote_average}%</span>
              </p>
              <ul className={css.genresList}>
                <li className={css.genres_firstItem}>Genres:</li>
                {genres?.map(({ id, name }) => (
                  <li key={id} className={css.genres_item}>
                    {name}
                  </li>
                ))}
              </ul>
              <p className={css.film_description}>
                Overview: <span>{overview}</span>
              </p>
            </div>
          </div>
          <ul className={css.moreInfoList}>
            <li>
              <Link
                className={css.moreInfo_link}
                to={'reviews'}
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link className={css.moreInfo_link} to={'cast'}>
                Cast
              </Link>
            </li>
          </ul>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </section>
         ) : (
        <p>Page not found</p>
      )}
      
    </>
  )
}

export default MovieDetailsPage
