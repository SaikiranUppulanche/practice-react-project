import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";

import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-https-6eaa1-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong....Retrying");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(newMovie) {
    await fetch(
      "https://react-https-6eaa1-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  async function deleteMovieHandler(id) {
    try {
      const res = await fetch(
        `https://react-https-6eaa1-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
      const updatedMovies = movies.filter((item) => item.id !== id);
      setMovies(updatedMovies);
    } catch (err) {
      alert(err.message);
    }
  }

  let content = <p>Found no Movies</p>;

  if (movies.length > 0) {
    content = <MoviesList onDeleteMovie={deleteMovieHandler} movies={movies} />;
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>{" "}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
