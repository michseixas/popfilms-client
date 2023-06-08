import axios from 'axios';
let baseUrl = 'https://imdb-api.com/en/API';



const getMovieDetails = (movieId) => {
   
    return axios.get(`https://imdb-api.com/en/API/Title/k_xmndj5an/${movieId}`)};

    

const getLikedMovies = (arrayMovieId) => {
        //arrayMovieId = ['236571', 'A3472R', '329898']
        let resMovies = arrayMovieId.map(movieId => {
            return getMovieDetails(movieId);
           
        })
        return Promise.all(resMovies)
    }
  

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
    else if (type === 'drama') {
        return axios.get('https://imdb-api.com/API/AdvancedSearch/k_xmndj5an/?title_type=feature&genres=drama') 
    } 
    else if (type === 'comedy') {
        return axios.get('https://imdb-api.com/API/AdvancedSearch/k_xmndj5an/?title_type=feature&genres=comedy') 
    }
    else if (type === 'action') {
        return axios.get('https://imdb-api.com/API/AdvancedSearch/k_xmndj5an/?title_type=feature&genres=action') 
    }
    else if (type === 'romance') {
        return axios.get('https://imdb-api.com/API/AdvancedSearch/k_xmndj5an/?title_type=feature&genres=romance') 
    } else {
        return Promise.reject(new Error("Invalid movie type"));
      }
};


// const getMoviesByGenre = (genre) => {
//     console.log( "que es lo que trae genre----???", genre)
//     if (genre !== '') {
//         return axios.get('https://www.imdb.com/search/title/?genres=' + genre);
//     } else {
//         return Promise.reject(new Error("Invalid movie genre"));
//       }
// };
export {getMoviesByType, getMovieDetails, getLikedMovies};    
