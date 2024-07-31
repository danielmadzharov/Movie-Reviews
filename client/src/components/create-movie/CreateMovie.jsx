import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';
import movieApi from '../../api/moviesApi.js';
import { Box, Typography, FormControl, TextField, Button } from '@mui/material';

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

export default function MovieCreate() {
    const navigate = useNavigate();

    const createHandler = async (values) => {
        // Convert the genre string to an array
        const formattedValues = {
            ...values,
            genre: values.genre.split(',').map(item => item.trim()),  // Split and trim the genre string
        };

        try {
            const { _id: movieId } = await movieApi.create(formattedValues);

            navigate(`/movies/${movieId}/details`);
        } catch (err) {
            // TODO: Set error state and display error
            console.log(err.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, createHandler);

    return (
        <Box p={3} style={{ width: '800px', margin: '0 auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
            <Typography variant="h4" gutterBottom>Create Movie</Typography>
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
