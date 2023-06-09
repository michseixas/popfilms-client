import axios from 'axios';
let baseUrl = import.meta.env.VITE_API_URL + "/movie";

const getMovieDetails= (movieId) => {
    return axios.get(baseUrl + '/'+ movieId)
}


export {getMovieDetails};