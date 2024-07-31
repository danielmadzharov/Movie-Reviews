import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import styles from './Catalog.module.css'; 
import { getAll } from '../../api/moviesApi';
import { Link } from 'react-router-dom';
import DetailsButton from './details-button/DetailsButton';

export default function Catalog() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAll().then(result => setMovies(result));
    }, []);

    return (
        <div className={styles.catalogContainer}>
            {movies.map((movie) => (
                <Card key={movie._id} className={styles.catalogCard}>
                    <div className={styles.catalogCardOverlay}>
                        <p className={styles.catalogDescriptionOverlay}>{movie.summary_text}</p>
                        <div className={styles.detailsButtonContainer}>
                            <Link to={`/details/${movie._id}`} className={styles.catalogLink}>
                                <DetailsButton />
                            </Link>
                        </div>
                    </div>
                    <CardHeader 
                        className={styles.catalogCardHeader}
                        avatar={
                            <Avatar className={styles.catalogAvatar}>
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
                        className={styles.catalogCardMedia}
                    />
                </Card>
            ))}
        </div>
    );
}
