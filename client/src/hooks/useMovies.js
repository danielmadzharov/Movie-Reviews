import { useState, useEffect } from 'react';
import movieApi from '../api/moviesApi';

export const useGetOneMovie = (movieId) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    movieApi.getById(movieId).then(result => setMovie(result));
  }, [movieId]);

  return [movie];
};

export const useGetAllMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieApi.getAll().then(result => setMovies(result));
  }, []);

  return [movies];
};
