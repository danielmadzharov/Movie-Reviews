import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@headlessui/react';

export default function Catalog() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('http://localhost:3030/jsonstore/Movies');
            const data = await response.json();
            setMovies(Object.values(data));
        };

        fetchMovies();
    }, []);

    return (
        <div className="catalog-container">
            {movies.map((movie) => (
                <Card key={movie._id} className="catalog-card">
                    <CardHeader 
                        className="catalog-card-header"
                        avatar={
                            <Avatar className="catalog-avatar">
                                {movie.ratingValue}
                            </Avatar>
                        }
                        title={movie.name}
                        subheader={movie.year}
                    />
                    <CardMedia
                        component="img"
                        height="300"
                        image={movie.poster_url}
                        alt={movie.name}
                        className="catalog-card-media"
                    />
                    <CardContent className="catalog-card-content">
                        <Typography variant="body2" color="text.secondary">
                            {movie.summary_text}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing className="catalog-card-actions">
                        <Link to={`/articles/${movie._id}`} className="catalog-link">
                            <Button 
                                className="catalog-button"
                                variant="contained" 
                                disableElevation
                            >
                                Details
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
}
