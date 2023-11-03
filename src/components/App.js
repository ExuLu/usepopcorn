import { useState } from 'react';
import ErrorMessage from './Main/ErrorMessage.js';
import Loader from './Main/Loader.js';
import NavBar from './NavBar/NavBar.js';
import Search from './NavBar/Search.js';
import NumResults from './NavBar/NumResults.js';
import Main from './Main/Main.js';
import Box from './Main/Box.js';
import MovieList from './Main/BoxAllMovies/MovieList.js';
import MovieDetails from './Main/MovieDetails.js';
import WatchedSummary from './Main/BoxWatched/WatchedSummary.js';
import WatchedMoviesList from './Main/BoxWatched/WatchedMoviesList.js';
import { useMovies } from './useMovies.js';
import { useLocalStorageState } from './useLocalStorageState.js';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const [isLoading, movies, error] = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((movies) => [...movies, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main movies={movies}>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
