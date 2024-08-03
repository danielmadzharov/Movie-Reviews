import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import styles from '../catalog/Catalog.module.css';
import { Link, useLocation } from 'react-router-dom';
import DetailsButton from '../catalog/details-button/DetailsButton';
import { useGetAllMovies } from '../../hooks/useMovies';


export default function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';
    const [movies] = useGetAllMovies();

    const filteredMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className={styles.catalogContainer}>
            {filteredMovies.length === 0 ? (
                <Card className={styles.catalogCard} style={{width: '800px'}}>
                    <CardHeader
                        title={
                            <Typography variant="h1" className={styles.noResultsTitle}>
                                No movies matching your search criteria were found!
                            </Typography>
                        }
                    />
                </Card>
            ) : (
                filteredMovies.map((movie) => (
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
                ))
            )}
        </div>
    );
}
