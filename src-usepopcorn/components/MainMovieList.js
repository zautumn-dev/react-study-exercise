// import React from 'react';
// import MainMovieItem from './MainMovieItem';
//
// // cloneElement
// // https://react.dev/reference/react/cloneElement
// function MainMovieList({movies, children}) {
//   return (
//       <ul className="list list-movies">
//         {movies?.map((movie) => React.cloneElement(children,
//             {movie, key: movie.imdbID}))}
//       </ul>
//   );
// }
//
// export default MainMovieList;

// 代替方案
// https://react.dev/reference/react/cloneElement#alternatives
import React from 'react';
import MainMovieItem from './MainMovieItem';

function MainMovieList({movies, renderFunc}) {
  return (
      <ul className="list list-movies">
        {movies?.map((movie) => renderFunc(movie))}
      </ul>
  );
}

export default MainMovieList;