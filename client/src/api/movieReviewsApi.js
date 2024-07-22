import requester from "./requester.js";

const BASE_URL = 'http://localhost:3030/jsonstore/Movies';

const buildUrl = (movieId) => `${BASE_URL}/${movieId}/reviews`;

const create = async (movieId, text) => await requester.post(buildUrl(movieId), { text });

const getAll = async (movieId) => {
    const result = await requester.get(buildUrl(movieId));

    const reviews = Object.values(result);

    return reviews;
}

export default {
    create,
    getAll,
};