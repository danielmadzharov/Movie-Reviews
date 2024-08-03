import * as requester from './requester.js'

const BASE_URL = 'http://localhost:3030/data/Movies'
export const getAll =  async () => {
    const result = await requester.get(BASE_URL)
    const movies = Object.values(result)
    return movies;
}
export const getById = async (movieId) => requester.get(`${BASE_URL}/${movieId}`);


export const create = (movieData) => requester.post(`${BASE_URL}`, movieData)

export const deleteById = (movieId) => requester.del(`${BASE_URL}/${movieId}`);

const movieApi = {
    getAll,
    getById,
    create,
    deleteById
}

export default movieApi;