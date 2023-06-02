import axios from 'axios';
let baseUrl = 'https://imdb-api.com/en/API';

const getTheater = () => {
    return axios.get(baseUrl + '/InTheaters/k_xmndj5an')};

const get250Top = () => {
    return axios.get(baseUrl + '/Top250Movies/k_xmndj5an')};    

export {getTheater, get250Top};    