import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const response = await fetch('https://swapi.dev/api/films/');
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
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Movies not found</p>}
        {isLoading && <p> Loading... </p>}
      </section>
    </React.Fragment>
  );
}

export default App;
