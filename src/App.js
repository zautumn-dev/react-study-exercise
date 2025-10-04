import {useEffect, useState} from 'react';
import Main from './components/Main';
import Nav from './components/Nav';
import NavNumResults from './components/NavNumResults';
import NavSearch from './components/NavSearch';
import MainListBox from './components/MainListBox';
import MainWatchedBox from './components/MainWatchedBox';
import MainMovieList from './components/MainMovieList';
import MainWatchSummary from './components/MainWatchSummary';
import MainWatchMovieList from './components/MainWatchMovieList';
import MainBox from './components/MainBox';

function asyncCatch(promise, finallyFunc) {
  return promise.then(res => [null, res])
      .catch(err => [err, null])
      .finally(finallyFunc);
}

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function ErrMessage({message}) {
  return <p className="error">‼️ {message}</p>;
}

export default function App() {
  const [query, setQuery] = useState('Interstellar');

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(undefined);

  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));

  const movieLen = movies.length;

  useEffect(() => {

    if (!query.length) {
      setErrMessage(undefined);
      setMovies([]);
      return;
    }
    ;

    (async () => {
      setIsLoading(true);
      setErrMessage(undefined);

      const [err, response] = await asyncCatch(fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}`));

      if (err) {
        setErrMessage(err.message);
        setIsLoading(false);

        return;
      }

      const result = await response.json();

      if (result.Response !== 'True') {
        setErrMessage(result.Error);
        setIsLoading(false);
        return;
      }

      setMovies(_ => result.Search);
      setIsLoading(false);

    })();

  }, [query]);

  return (
      <>
        <Nav query={query} setQuery={setQuery}>
          <NavSearch query={query} setQuery={setQuery}/>
          <NavNumResults movieLen={movieLen}/>
        </Nav>
        <Main>
          <MainBox>
            {/*{isLoading ? <Loading/> : <MainMovieList*/}
            {/*    movies={movies}></MainMovieList>}*/}

            {isLoading && <Loading/>}
            {!isLoading && !errMessage &&
                <MainMovieList movies={movies}></MainMovieList>}
            {errMessage && <ErrMessage message={errMessage}/>}
          </MainBox>
          <MainBox>
            <MainWatchSummary watched={watched} avgUserRating={avgUserRating}
                              avgImdbRating={avgImdbRating}
                              avgRuntime={avgRuntime}/>
            <MainWatchMovieList watched={watched}/>
          </MainBox>
        </Main>
      </>
  );
}

function Loading() {
  return <p className="loader">loading...</p>;
}

