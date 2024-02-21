import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const [fetchTimerId, setFetchTimerId] = useState(null);

  async function fetchMoviesHandler() {
    setLoading(true);
    setError(null);
    setRetrying(true);

    try {
      const response = await fetch("https://swapi.dev/api/film");
      if (!response.ok) {
        throw new Error("Something went wrong....Retrying");
      }
      const data = await response.json();

      const movieDetails = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(movieDetails);
    } catch (error) {
      setError(error.message);
      const timerId = setTimeout(fetchMoviesHandler, 5000);
      setFetchTimerId(timerId);
    }
    setLoading(false);
  }

  function stopFetching() {
    setRetrying(false);
    clearTimeout(fetchTimerId);
    setLoading(false);
    setError(null);
  }

  let content = <p>Found no Movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (loading) {
    content = <h3>Loading Movies....</h3>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>{" "}
        {retrying && <button onClick={stopFetching}>Stop Fetching</button>}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
