import { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating.js';
import Loader from './Loader.js';
import { KEY } from '../../constants.js';
import { useKey } from '../useKey.js';

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [seletedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      imdbRating: Number(imdbRating),
      poster,
      title,
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecision: countRef.current,
    };

    onCloseMovie();

    onAddWatched(newWatchedMovie);
  }

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = seletedMovie;

  useEffect(
    function () {
      async function fetchMovieDetails() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res) throw new Error('Something went wrong');

          const data = await res.json();
          setSelectedMovie(data);
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `MOVIE: ${title}`;

      return function () {
        document.title = 'usePopcorn';
      };
    },
    [title]
  );

  useKey('Escape', onCloseMovie);

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p> {genre} </p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                    defaultRating={watchedUserRating}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}{' '}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} 🌟</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
