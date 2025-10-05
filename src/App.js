import {useCallback, useEffect, useState} from 'react';
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
import MainMovieItem from './components/MainMovieItem';
import MovieDetail from './components/MovieDetail';
import {asyncCatch} from './lib/utils';
import Loading from './components/Loading';

const LOCAL_WATCHED = 'watched';

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function ErrMessage({message}) {
  return <p className="error">‼️ {message}</p>;
}

export default function App() {
  // Interstellar inception
  const [query, setQuery] = useState('Interstellar');

  const [movies, setMovies] = useState([]);
  // 初始化 usestate 传入一个回调函数 在初次渲染阶段就获取到了本地的初始值
  // https://zh-hans.react.dev/reference/react/useState#usestate
  const [watched, setWatched] = useState(function() {
    const localWatched = JSON.parse(localStorage.getItem(LOCAL_WATCHED));

    if (!localWatched.length) return [];

    return localWatched;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(undefined);

  const [movieDetailId, setMovieDetailId] = useState(undefined);
  const [movieDetailUserRating, setMovieDetailUserRating] = useState(undefined);

  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));

  const movieLen = movies.length;

  const updateMovieDetailId = useCallback(
      function(selectId) {

        const currentMovie = watched.find(movie => movie.imdbID === selectId);

        setMovieDetailId(id => selectId === id ? undefined : selectId);
        setMovieDetailUserRating(currentMovie ? currentMovie.userRating : 0);

      }, [watched]);

  function addWatchedMovie(movie) {
    const newMovie = {
      imdbID: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(' ').at(0)),
      userRating: movie.userRating,
    };

    const movieIndex = watched.findIndex(m => m.imdbID === movie.imdbID);

    console.log(movieIndex, 'movieIndex');
    // movie 处理
    // newMovie = {
    //   imdbID: movie.imdbID,
    //   title: movie.Title,
    //   year: movie.Year,
    //   poster: movie.Poster,
    //   imdbRating: Number(movie.imdbRating),
    //   runtime: Number(movie.Runtime.split(' ').at(0)),
    //   userRating: movie.userRating,
    //   // countRatingDecisions: countRef.current,
    // };
    setWatched(list => {
      const newList = [...list];

      if (movieIndex === -1) return newList.toSpliced(newList.length, 0,
          newMovie);

      Reflect.set(newList, movieIndex, newMovie);
      console.log(newList);

      return newList;
    });
    updateMovieDetailId(movie.imdbID);
  }

  function handleDelWatchMovie(id) {
    setWatched(movies => movies.filter(m => m.imdbID !== id));
  }

  // useEffect(() => {
  //   // 获取本地已存储的观看列表 不可行 这时获取的是空数组
  //   const localWatched = JSON.parse(localStorage.getItem(LOCAL_WATCHED));
  //   console.log(localWatched);
  //
  //   if (!localWatched.length) return;
  //
  //   setWatched(_ => localWatched);
  // }, []);

  useEffect(() => {

    if (!query.length) {
      setErrMessage(undefined);
      setMovies([]);
      return;
    }

    updateMovieDetailId(movieDetailId);

    const controller = new AbortController();

    (async () => {
      setIsLoading(true);
      setErrMessage(undefined);

      const [err, response] = await asyncCatch(fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}`,
          {signal: controller.signal}));

      if (err) {
        // "The user aborted a request." 和 "signal is aborted without reason" 都是同类错误。
        // 在 React 里过滤掉 AbortError 类型报错 就行
        if (err.name !== 'AbortError') {
          setErrMessage(err.message);
          setIsLoading(false);
        }

        return;
      }

      // const response = await fetch(
      //     `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}`,
      //     {signal: controller.signal});

      const result = await response.json();

      if (result.Response !== 'True') {
        setErrMessage(result.Error);
        setIsLoading(false);
        return;
      }

      setMovies(_ => result.Search);
      setIsLoading(false);

    })();

    return function() {
      controller.abort();
    };

  }, [query]);

  useEffect(function() {
    function ESCKeyDownListener(e) {
      if (e.code === 'Escape' && movieDetailId) {
        updateMovieDetailId(movieDetailId);
      }
    }

    document.addEventListener('keydown', ESCKeyDownListener);

    return () => {
      document.removeEventListener('keydown', ESCKeyDownListener);
    };
  }, [movieDetailId, updateMovieDetailId]);

  // useEffect 只有在渲染阶段结束后才会执行
  useEffect(function() {
    // 组件渲染就会执行一次 useEffect 这是特性 就会把默认已经保存的值重新覆盖为空数组了
    localStorage.setItem(LOCAL_WATCHED, JSON.stringify(watched));
  }, [watched]);

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
                <MainMovieList movies={movies}
                               renderFunc={(movie) => <MainMovieItem
                                   movie={movie} key={movie.imdbID}
                                   setCurrentMovieId={updateMovieDetailId}/>}/>
            }
            {errMessage && <ErrMessage message={errMessage}/>}
          </MainBox>
          <MainBox>
            {movieDetailId
                ? <MovieDetail imdbId={movieDetailId}
                               closeDetail={updateMovieDetailId}
                               addWatchMovie={addWatchedMovie}
                               userRating={movieDetailUserRating}
                               movies={movies}/>
                :
                <>
                  <MainWatchSummary watched={watched}
                                    avgUserRating={avgUserRating}
                                    avgImdbRating={avgImdbRating}
                                    avgRuntime={avgRuntime}/>
                  <MainWatchMovieList watched={watched}
                                      onDeleteWatched={handleDelWatchMovie}/>
                </>}
          </MainBox>
        </Main>
      </>
  );
}



