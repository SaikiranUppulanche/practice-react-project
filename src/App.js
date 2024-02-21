import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchMoviesHandler() {
    setLoading(true);
    const response = await fetch("https://swapi.dev/api/films");

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
    setLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {loading && <h3>Loading Movies....</h3>}
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {!loading && !movies.length && (
          <p>Click on "Fetch Movies" to Load Movies</p>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
