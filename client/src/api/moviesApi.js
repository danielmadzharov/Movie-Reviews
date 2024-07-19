import * as requester from './requester'

const BASE_URL = 'http://localhost:3030/jsonstore/Movies'
export const getAll =  () => requester.get(BASE_URL)

export const getById = () => requester.get(BASE_URL + '/id')