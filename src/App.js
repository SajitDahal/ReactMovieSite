import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=5338e586";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL} &s=${title}`); //data fectch from API and put in data variable
    const data = await response.json(); //response is parsed into json

    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies();
  }, []);
  return (
    <div className="app">
      <h1>WatchFlix</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search Movie..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found!!</h2>
        </div>
      )}
    </div>
  );
};
export default App;
