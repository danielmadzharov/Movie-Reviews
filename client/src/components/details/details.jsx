import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import movieApi from '../../api/moviesApi';
import reviewsApi from '../../api/movieReviewsApi'; 
import styles from './Details.module.css';
import { useAuthContext } from '../../contexts/authContext';

export default function Details() {  
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [review, setReview] = useState('');
  const { isAuthenticated } = useAuthContext();
  const { email, userId } = useAuthContext();

  useEffect(() => {
    movieApi.getById(movieId).then(result => setMovie(result));
  }, [movieId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const newReview = await reviewsApi.create(movieId, review);

    setMovie(prevState => ({
      ...prevState,
      reviews: {
        ...prevState.reviews,
        [newReview._id]: newReview
      }
    }));

    setReview('');
  };
  const isOwner = userId == movie._ownerId;

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
          {isOwner && isAuthenticated &&(
          <div className='edit-delete-container'>
          <Button variant="contained" className='edit-btn' style={{margin: '10px'}}>Edit</Button>
          <Button variant="contained" className='delete-btn'style={{margin: '10px'}}>Delete</Button>
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
          onSubmit={handleReviewSubmit} 
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <h3>Submit your review</h3>
          <TextField
            id="outlined-multiline-static"
            multiline
            minRows={5}
            placeholder='Write your review...'
            style={{ width: '500px' }}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Button type="submit" variant='contained' style={{ marginTop: '10px' }}>
            Submit
          </Button>
        </form>
      )}
      <div className="details-reviews">
        <h2>Reviews:</h2>
        <ul>
          {movie.reviews && Object.keys(movie.reviews).length > 0
            ? Object.values(movie.reviews).map(review => (
              <div key={review._id} className="review review-border" style={{ border: '3px solid', padding: '15px', marginBottom: '15px' }}>
                <h3>Review:</h3>
                <h4>{review.text}</h4>
              </div>
            ))
            : 
            <div>
              <p className="no-review">No reviews.</p>
            </div>
          }
        </ul>
      </div>
      </Card>
    </div>
  );
}
