import {useState} from 'react';
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

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
        'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
        'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];
const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
        'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(tempMovieData);

  const [watched, setWatched] = useState(tempWatchedData);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  const movieLen = movies.length;

  return (
      <>
        <Nav query={query} setQuery={setQuery}>
          <NavSearch query={query} setQuery={setQuery}/>
          <NavNumResults movieLen={movieLen}/>
        </Nav>
        <Main>
          <MainBox>
            <MainMovieList movies={movies}></MainMovieList>
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


