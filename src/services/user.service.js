import axios from 'axios';


let baseUrl = import.meta.env.VITE_API_URL + "/user";
// let baseUrl2 = 'https://imdb-api.com/en/API';


//this function will be called on the front end on the page that we need. In this case, the user profile

//get user info by Id
const getUserInfo = (userId) => {
    return axios.get(baseUrl + '/'+ userId)
};

//update user info by Id
const updateUserInfo= (userId, newData) => {
    return axios.post(baseUrl + '/' + userId +'/update', newData)
};

//delete user by Id
const deleteUser= (userId) => {
    return axios.post(baseUrl + '/' + userId +'/delete')
};

//update user image by Id
const updateImage= (userId, newImage) => {
    return axios.post(baseUrl + '/:userId/updateImage', {image: newImage})
}



const likeMovie = (movieId) => {
    let token = localStorage.getItem('authToken');

    return axios.post(`${baseUrl}/likeMovie`, {movieId}, {headers: {authorization: `Bearer ${token}`}});
  };

  const dislikeMovie = (movieId) => {
    let token = localStorage.getItem('authToken');

    return axios.post(`${baseUrl}/dislikeMovie`, {movieId}, {headers: {authorization: `Bearer ${token}`}});
  };


  

  

  
  



export {getUserInfo, updateUserInfo, deleteUser, updateImage, likeMovie, dislikeMovie};
