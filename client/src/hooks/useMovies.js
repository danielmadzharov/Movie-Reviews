import { useState, useEffect } from 'react';
import movieApi from '../api/moviesApi';

export const useGetOneMovie = (movieId) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      const result = await movieApi.getById(movieId);
      setMovie(result);
    })();
  }, [movieId]);

  return [movie, setMovie];
};

export const useGetAllMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieApi.getAll().then(result => setMovies(result));
  }, []);

  return [movies];
};
