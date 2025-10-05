import React, {useEffect, useRef, useState} from 'react';
import {asyncCatch} from '../lib/utils';
import Loading from './Loading';
import StarRating from './StarRating';

function MovieDetail({
  imdbId,
  closeDetail,
  addWatchMovie,
  userRating = 0,
  movies,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const clickCount = useRef(0);

  const allowRating = !userRating;
  // const z

  useEffect(() => {

    (async function() {
      setIsLoading(true);

      const [err, response] = await asyncCatch(fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${imdbId}`,
      ));

      if (err) return;
      const result = await response.json();
      setMovie({...result});
      setIsLoading(false);
    })();

  }, [imdbId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `movie | ${movie.Title}`;

    return function() {
      // 闭包, 所以在 组件卸载后仍然可以访问到movie.Title变量
      document.title = `default | ${movie.Title}`;
    };
  }, [movie.Title]);

  return (
      <>
        {isLoading ? <Loading/> : <div className="details">

          <header>
            <button className="btn-back" onClick={() => closeDetail(imdbId)}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title} movie`}/>
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {clickCount.current}

              <StarRating
                  option={
                    {size: 24}
                  }
                  defaultRating={userRating}
                  onSetRating={rating => {
                    setMovie(
                        movie => ({...movie, userRating: rating}));

                    clickCount.current++;
                  }}

              />
              {
                  allowRating &&
                  <button className="btn-add"
                          onClick={() => addWatchMovie(movie)}>
                    + Add to list
                  </button>
              }


              {/*<p>*/}
              {/*  You rated with movie {watchedUserRating} <span>⭐️</span>*/}
              {/*</p>*/}

            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>

        </div>}
      </>

  );
}

export default MovieDetail;