import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import movieApi from '../../api/moviesApi';


export default function Details() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  console.log(movieId)

  useEffect(() => {
      movieApi.getById(movieId).then(result => setMovie(result));

  },[]);


  return (
    <Card sx={{ maxWidth: 1000, position: 'relative', paddingLeft: '100px' }}>
      <CardMedia
        component="img"
        alt={movie.name}
        height="500"
        image={movie.poster_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
