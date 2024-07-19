import * as request from './requester'

const BASE_URL = 'http://localhost:3030/jsonstore/Movies'
export const getAll =  async () => {
    const result = await request.get(BASE_URL)
    const movies = Object.values(result)
    return movies;
}
export const getById = async (movieId) => request.get(`${BASE_URL}/${movieId}`);


const movieApi = {
    getAll,
    getById
}

export default movieApi;