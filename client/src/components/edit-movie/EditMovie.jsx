import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';
import movieApi from '../../api/moviesApi.js';
import { Box, Typography, FormControl, TextField, Button } from '@mui/material';
import { useGetOneMovie } from '../../hooks/useMovies.js';

const initialValues = {
    name: '',
    poster_url: '',
    year: '',
    certificate: '',
    runtime: '',
    genre: '',
    ratingValue: '',
    summary_text: '',
    ratingCount: '',
    director: '',
};

export default function EditMovie() {
    const navigate = useNavigate();
    const {movieId} = useParams();
    const [editMovie, setEditMovie] = useGetOneMovie(movieId)
    const {changeHandler, submitHandler, values} = useForm(Object.assign(initialValues, editMovie), async (values) => {
        const updateMovie = await movieApi.editMovie(movieId, values);
        setEditMovie(updateMovie);
        navigate(`/details/${movieId}`);
})

    return (
        <Box p={3} style={{ width: '800px', margin: '0 auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
            <Typography variant="h4" gutterBottom>Edit Movie</Typography>
            <FormControl fullWidth>
                <TextField
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={values.name}
                    onChange={changeHandler}
                    margin="normal"
                />
                <TextField
                    label="Poster URL"
                    variant="outlined"
                    name="poster_url"
                    value={values.poster_url}
                    onChange={changeHandler}
                    margin="normal"
                />
                <TextField
                    label="Year"
                    variant="outlined"
                    name="year"
                    type='number'
                    value={values.year}
                    onChange={changeHandler}
                    margin="normal"
                />
                <TextField
                    label="Certificate"
                    variant="outlined"
                    name="certificate"
                    value={values.certificate}
                    onChange={changeHandler}
                    margin="normal"
                />
                <TextField
                    label="Runtime"
                    variant="outlined"
                    name="runtime"
                    type='number'
                    value={values.runtime}
                    onChange={changeHandler}
                    margin="normal"
                />
                <TextField
                    label="Genre"
                    variant="outlined"
                    name="genre"
                    value={values.genre}
                    onChange={changeHandler}
                    margin="normal"
                />
                <TextField
                    label="Rating Value"
                    variant="outlined"
                    type='number'
                    name="ratingValue"
                    value={values.ratingValue}
                    onChange={changeHandler}
                    margin="normal"
                />
                <TextField
                    label="Summary"
                    variant="outlined"
                    name="summary_text"
                    value={values.summary_text}
                    onChange={changeHandler}
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TextField
                    label="Rating Count"
                    variant="outlined"
                    name="ratingCount"
                    type='number'
                    value={values.ratingCount}
                    onChange={changeHandler}
                    margin="normal"
                />
                <TextField
                    label="Director"
                    variant="outlined"
                    name="director"
                    value={values.director}
                    onChange={changeHandler}
                    margin="normal"
                />
                <Button onClick={submitHandler} variant="contained" color="primary" style={{ margin: '20px 0' }}>
                    Submit
                </Button>
            </FormControl>
        </Box>
    );
}
