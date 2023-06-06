import axios from 'axios';
let baseUrl = 'https://imdb-api.com/en/API';


const getTheater = () => {
    return axios.get(baseUrl + '/InTheaters/k_xmndj5an')};

const get250Top = () => {
    return axios.get(baseUrl + '/Top250Movies/k_xmndj5an')};    

const getMoviesByType = (type) => {
    console.log( "que es lo que trae type----???", type)
    if (type === 'top250') {
        return axios.get(baseUrl + '/Top250Movies/k_xmndj5an');
    } 
    else if (type === 'theater') {
        return axios.get(baseUrl + '/InTheaters/k_xmndj5an');
    } 
    else if (type === 'mostpopular') {
        return axios.get(baseUrl + '/MostPopularMovies/k_xmndj5an');
    } 
    else if (type === 'comingsoon') {
        return axios.get(baseUrl + '/ComingSoon/k_xmndj5an') 
    }
};

export {getTheater, get250Top, getMoviesByType};    