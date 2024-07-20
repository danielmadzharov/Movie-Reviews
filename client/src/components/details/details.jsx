import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import movieApi from '../../api/moviesApi';
import styles from './Details.module.css';


export default function Details() {  
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    movieApi.getById(movieId).then(result => setMovie(result));
  }, [movieId]);

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
    director, 
    cast 
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
          <ul>
            {cast?.map((actor, index) => (
              <li key={index}>{actor.name}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
