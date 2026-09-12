/* eslint-disable react-hooks/set-state-in-effect */
import {useState, useEffect} from 'react';
import {useDebounce} from 'react-use';
import Search from "./Search"
import Spinner from './Spinner';
import MovieCard from './MovieCard';
import {updateSearchCount} from '../appwrite.js';
import {getTrendingMovies} from '../appwrite.js';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 600, [searchTerm]);

  const fetchMovies = async function(query = "") {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query ? 
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const  response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`failed to fetch movies: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      if(data.Response === "False") {
        setErrorMessage(data.Error);
        setMovieList([]);
        return;
      } 

      console.log(data.results);
      setMovieList(data.results || []);

      if(query && data.results.length > 0) {
      await updateSearchCount(query, data.results[0]); // Call the function to update the search count in Appwrite
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies. Please try again later.`)
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const trending = await getTrendingMovies();
      setTrendingMovies(trending);
    } catch (error) {
      console.error("Error loading trending movies:", error);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <>
      <div className="pattern" />
      <div className="absolute top-[60vh] left-0 w-full h-[40vh] bg-gradient-to-b from-transparent via-[#030014]/70 to-[#030014] pointer-events-none z-0" />

      <div className="wrapper">
        <header>
          <h1>Find <span className="text-gradient">Movies</span>  you'll Enjoy</h1>
          <img src=".\hero.png" alt="Hero banner" />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Searches</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title}
                  className="w-40 h-56 sm:w-36 sm:h-52 object-cover rounded-lg shadow-md"/>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.length > 0 ? movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              )) 
              : <div className="text-red-700 text-center text-xl mx-auto">No movies found for {debouncedSearchTerm}</div>}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}

export default Home;