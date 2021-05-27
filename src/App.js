// import React, { useState } from 'react';

// import MoviesList from './components/MoviesList';
// import './App.css';

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   // const fetchMoviesHandler = () => {
//   //   setIsLoading(true);
//   //   fetch('https://swapi.dev/api/films/').then((response) =>
//   //     response.json().then((data) => {
//   //       const transformMovies = data.results.map((item) => {
//   //         return {
//   //           id: item.episode_id,
//   //           title: item.title,
//   //           releaseDate: item.release_date,
//   //           openingText: item.opening_crawl,
//   //         };
//   //       });
//   //       setMovies(transformMovies);
//   //       console.log(movies);
//   //       setIsLoading(false);
//   //     }),
//   //   );
//   // }

//   // ======= async / await ======
//   // async function fetchMoviesHandler() {
//   const fetchMoviesHandler = async () => {
//     setIsLoading(true);
//     // setError(null) for clear error
//     setError(null);
//     try {
//       const response = await fetch('https://swapi.dev/api/films/');
//       if (!response.ok) {
//         //the response also has a 'status' field which holds the concrete response status code. could also manually check that
//         throw new Error('Something went wrong!');
//       }
//       const data = await response.json();

//       const transformMovies = data.results.map((item) => {
//         return {
//           id: item.episode_id,
//           title: item.title,
//           releaseDate: item.release_date,
//           openingText: item.opening_crawl,
//         };
//       });
//       setMovies(transformMovies);
//     } catch (error) {
//       setError(error.message);
//     }
//     setIsLoading(false);
//   };
//   //study todo: axios pack for error manipulation
//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
//         {!isLoading && movies.length === 0 && !error && <p>Movies not found</p>}
//         {!isLoading && error && <p>{error}</p>}
//         {isLoading && <p> Loading... </p>}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;
import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    console.log(movie);
    const response = await fetch(
      'https://react-http-a2f61-default-rtdb.europe-west1.firebasedatabase.app//movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
