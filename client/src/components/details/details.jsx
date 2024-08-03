import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useParams } from 'react-router-dom';
import movieApi from '../../api/moviesApi';
import { useGetOneMovie } from '../../hooks/useMovies';
import styles from './Details.module.css';
import { useForm } from '../../hooks/useForm';
import { useGetAllReviews, useCreateReview } from '../../hooks/useReviews';
import { useAuthContext } from '../../contexts/authContext';
// import { useGetOneMovie } from '../../hooks/useMovies'; 


const initialValues = {
  review: ''
};

export default function Details() {
  const { movieId } = useParams();
  const [reviews, dispatch] = useGetAllReviews(movieId);
  const createReview = useCreateReview();
  const { email, userId, isAuthenticated } = useAuthContext();
  const [movie] = useGetOneMovie(movieId);

  const {
    changeHandler,
    submitHandler,
    values
  } = useForm(initialValues, async ({ review }) => {
    try {
      const newReview = await createReview(movieId, review);
      dispatch({ type: 'ADD_REVIEW', payload: { ...newReview, author: { email } } });
    } catch (err) {
      console.log(err.message);
    }
  });

  const isOwner = userId === movie._ownerId;


  const movieDeleteHandler = async () => {
    try {
      await movieApi.deleteById(movieId);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete the movie:', error);
    }
  };

  const {
    name: title,
    poster_url: posterUrl,
    year,
    certificate,
    runtime,
    genre,
    ratingValue,
    summary_text: summaryText,
    ratingCount,
    director
  } = movie;

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.imageContainer}>
          <h2 className={styles.title}>{title}</h2>
          <CardMedia
            component="img"
            alt={title}
            height="500"
            image={posterUrl}
            className={styles.image}
          />
          {isOwner && isAuthenticated && (
            <div className='edit-delete-container'>
              <Button variant="contained" className='edit-btn' style={{ margin: '10px' }}>Edit</Button>
              <Button variant="contained" onClick={movieDeleteHandler} className='delete-btn' style={{ margin: '10px' }}>Delete</Button>
            </div>
          )}
        </div>
        <div className={styles.details}>
          <p>Year: {year}</p>
          <p>Certificate: {certificate}</p>
          <p>Runtime: {runtime}</p>
          <p>Genre: {genre?.join(', ')}</p>
          <p>Rating: {ratingValue}</p>
          <p>Summary: {summaryText}</p>
          <p>Rating Count: {ratingCount}</p>
          <p>Director: {director?.name}</p>
        </div>
      </Card>
      <Card className={styles.card} style={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {isAuthenticated && (
          <form
            onSubmit={submitHandler}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              justifyContent: 'space-evenly',
              alignItems: 'center',

            }}
          >
            <h3>Submit your review</h3>
            <TextField
              id="outlined-multiline-static"
              multiline
              minRows={5}
              placeholder='Write your review...'
              style={{ width: '500px' }}
              name='review'
              value={values.review}
              onChange={changeHandler}
            />
            <Button type="submit" variant='contained' style={{ marginTop: '10px' }}>
              Submit
            </Button>
          </form>
        )}

      <div className="details-reviews">
        <h2>Reviews:</h2>
        <ul>
          {reviews.map(review => (
            <div key={review._id} className="review review-border" style={{ border: '3px solid', padding: '15px', marginBottom: '15px' }}>
              <h3>{review.author.email}:</h3>
              <h4>{review.text}</h4>
            </div>
          ))}
        </ul>

        {reviews.length === 0 && <p className="no-review">No reviews.</p>}
      </div>

      </Card>
    </div>
  );
}
