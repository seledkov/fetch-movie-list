import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const fetchMoviesHandler = () => {
  //   setIsLoading(true);
  //   fetch('https://swapi.dev/api/films/').then((response) =>
  //     response.json().then((data) => {
  //       const transformMovies = data.results.map((item) => {
  //         return {
  //           id: item.episode_id,
  //           title: item.title,
  //           releaseDate: item.release_date,
  //           openingText: item.opening_crawl,
  //         };
  //       });
  //       setMovies(transformMovies);
  //       console.log(movies);
  //       setIsLoading(false);
  //     }),
  //   );
  // }

  // ======= async / await ======
  // async function fetchMoviesHandler() {
  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    // setError(null) for clear error
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        //the response also has a 'status' field which holds the concrete response status code. could also manually check that
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      const transformMovies = data.results.map((item) => {
        return {
          id: item.episode_id,
          title: item.title,
          releaseDate: item.release_date,
          openingText: item.opening_crawl,
        };
      });
      setMovies(transformMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };
  //study todo: axios pack for error manipulation
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Movies not found</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p> Loading... </p>}
      </section>
    </React.Fragment>
  );
}

export default App;
