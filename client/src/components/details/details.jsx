import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import movieApi from '../../api/moviesApi';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default function Details() {
  const handleChange = (panel) => (event, isExpanded) => {
    const [expanded, setExpanded] = React.useState(false);
    setExpanded(isExpanded ? panel : false);
  };
  


  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  console.log(movieId)

  useEffect(() => {
      movieApi.getById(movieId).then(result => setMovie(result));

  },[]);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card sx={{ maxWidth: 2000 }}>
        <CardMedia
          component="img"
          alt={movie.name}
          height="700"
          image={movie.poster_url}
        />
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          </Typography>
          <Typography variant="body2" color="text.secondary">
          </Typography>
        </CardContent> */}
      </Card>
    
    </div>
  );
}
