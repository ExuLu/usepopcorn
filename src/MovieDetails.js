import { useEffect, useState } from 'react';
import StarRating from './StarRating.js';
import Loader from './Loader.js';
import { KEY } from './constants.js';

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
}) {
  const [seletedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      imdbRating: Number(imdbRating),
      poster,
      title,
      runtime: Number(runtime.split(' ').at(0)),
      userRating: 8,
    };

    onAddWatched(newWatchedMovie);
  }

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
          console.log(data);
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
              <StarRating maxRating={10} size={24} />

              <button className='btn-add' onClick={handleAdd}>
                Add to list
              </button>
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
