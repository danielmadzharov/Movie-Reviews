import * as requester from './requester.js'

const BASE_URL = 'http://localhost:3030/jsonstore/Movies'
export const getAll =  async () => {
    const result = await requester.get(BASE_URL)
    const movies = Object.values(result)
    return movies;
}
export const getById = async (movieId) => requester.get(`${BASE_URL}/${movieId}`);


const movieApi = {
    getAll,
    getById,
}

export default movieApi;