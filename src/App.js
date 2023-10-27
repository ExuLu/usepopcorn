import { useState } from 'react';
import { tempMovieData, tempWatchedData } from './data';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar movies={movies} />
      <Main movies={movies} />
    </>
  );
}

function NavBar({ movies }) {
  return (
    <nav className='nav-bar'>
      <Logo />
      <Search />
      <NumResults movies={movies} />
    </nav>
  );
}

function Search() {
  const [query, setQuery] = useState('');

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ movies }) {
  return (
    <main className='main'>
      <ListBox movies={movies} />
      <WatchedBox />
    </main>
  );
}

function ListBox({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className='box'>
      <Button onClick={setIsOpen1} isOpen={isOpen1} />
      {isOpen1 && <MovieList movies={movies} />}
    </div>
  );
}

function MovieList({ movies, content }) {
  return (
    <ul className='list'>
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Button({ onClick, isOpen }) {
  return (
    <button className='btn-toggle' onClick={() => onClick((open) => !open)}>
      {isOpen ? '–' : '+'}
    </button>
  );
}

function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className='box'>
      <Button onClick={setIsOpen2} isOpen={isOpen2} />
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />

          {/* <MovieList movies={watched} /> */}
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
