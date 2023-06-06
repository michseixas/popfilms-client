import axios from 'axios';
let baseUrl = 'http://localhost:5005/movie';

const getMovieDetails= (movieId) => {
    return axios.get(baseUrl + '/'+ movieId)
}


export {getMovieDetails};