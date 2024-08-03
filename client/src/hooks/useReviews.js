import { useEffect, useReducer } from 'react';
import movieReviewsAPI from '../api/movieReviewsApi.js';

export function useCreateReview() {
  const createHandler = (movieId, text) => movieReviewsAPI.create(movieId, text);
  return createHandler;
}

function reviewsReducer(state, action) {
  switch (action.type) {
    case 'GET_ALL':
      return action.payload.slice();
    case 'ADD_REVIEW':
      return [...state, action.payload];
    default:
      return state;
  }
}

export function useGetAllReviews(movieId) {
  const [reviews, dispatch] = useReducer(reviewsReducer, []);

  useEffect(() => {
    (async () => {
      const result = await movieReviewsAPI.getAll(movieId);
      dispatch({ type: 'GET_ALL', payload: result });
    })();
  }, [movieId]);

  return [reviews, dispatch];
}
