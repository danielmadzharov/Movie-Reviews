import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import movieApi from '../../api/moviesApi.js';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';

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

const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.poster_url) {
        errors.poster_url = 'Poster URL is required';
    }
    if (!values.year) {
        errors.year = 'Year is required';
    }
    if (!values.certificate) errors.certificate = 'Certificate is required';
    if (!values.runtime) errors.runtime = 'Runtime is required';
    if (!values.genre) errors.genre = 'Genre is required';
    if (!values.ratingValue) {
        errors.ratingValue = 'Rating Value is required';
    }
    if (!values.summary_text) errors.summary_text = 'Summary is required';
    if (!values.ratingCount) {
        errors.ratingCount = 'Rating Count is required';
    }
    if (!values.director) errors.director = 'Director is required';
    return errors;
};

export default function MovieCreate() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: async (values) => {
            try {
                const { _id: movieId } = await movieApi.create(values);
                navigate(`/details/${movieId}`);
            } catch (err) {
                console.log(err.message);
            }
        },
    });

    return (
        <Box p={3} style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
            <Typography variant="h4" gutterBottom>Create Movie</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Poster URL"
                            variant="outlined"
                            name="poster_url"
                            value={formik.values.poster_url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.poster_url && Boolean(formik.errors.poster_url)}
                            helperText={formik.touched.poster_url && formik.errors.poster_url}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Year"
                            variant="outlined"
                            name="year"
                            type='number'
                            value={formik.values.year}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.year && Boolean(formik.errors.year)}
                            helperText={formik.touched.year && formik.errors.year}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Certificate"
                            variant="outlined"
                            name="certificate"
                            value={formik.values.certificate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.certificate && Boolean(formik.errors.certificate)}
                            helperText={formik.touched.certificate && formik.errors.certificate}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Runtime"
                            variant="outlined"
                            name="runtime"
                            type='number'
                            value={formik.values.runtime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.runtime && Boolean(formik.errors.runtime)}
                            helperText={formik.touched.runtime && formik.errors.runtime}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Genre"
                            variant="outlined"
                            name="genre"
                            value={formik.values.genre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.genre && Boolean(formik.errors.genre)}
                            helperText={formik.touched.genre && formik.errors.genre}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Rating Value"
                            variant="outlined"
                            name="ratingValue"
                            type='number'
                            value={formik.values.ratingValue}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.ratingValue && Boolean(formik.errors.ratingValue)}
                            helperText={formik.touched.ratingValue && formik.errors.ratingValue}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Summary"
                            variant="outlined"
                            name="summary_text"
                            value={formik.values.summary_text}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.summary_text && Boolean(formik.errors.summary_text)}
                            helperText={formik.touched.summary_text && formik.errors.summary_text}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Rating Count"
                            variant="outlined"
                            name="ratingCount"
                            type='number'
                            value={formik.values.ratingCount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.ratingCount && Boolean(formik.errors.ratingCount)}
                            helperText={formik.touched.ratingCount && formik.errors.ratingCount}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Director"
                            variant="outlined"
                            name="director"
                            value={formik.values.director}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.director && Boolean(formik.errors.director)}
                            helperText={formik.touched.director && formik.errors.director}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}