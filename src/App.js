import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import NewMovie from './components/NewMovie';

function App() {
  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError] = useState(null);



  const fetchMoviesHandler = useCallback(async ()=>{
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch('https://swapi.dev/api/films/');
      if(!response.ok){
        throw new Error('Something Went Wrong!')
      }
      const data = await response.json();
        const transerformedMovies = data.results.map((movieData)=>{
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releseDate: movieData.relese_date
          }
        })
        setMovies(transerformedMovies);
        setIsLoading(false);
    }
  catch(error){
    setError(error.message);
  }
  setIsLoading(false);
 },[])

  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
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
        <NewMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
