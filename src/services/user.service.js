import axios from 'axios';
let baseUrl = 'http://localhost:5005/user';


//this function will be called on the front end on the page that we need. In this case, the user profile

//get user info by Id
const getUserInfo = (userId) => {
    return axios.get(baseUrl + '/'+ userId)
};

//update user info by Id
const updateUserInfo= (userId, newData) => {
    return axios.post(baseUrl + '/:userId/update', newData)
};

//delete user by Id
const deleteUser= (userId) => {
    return axios.post(baseUrl + '/:userId/delete')
};

//update user image by Id
const updateImage= (userId, newImage) => {
    return axios.post(baseUrl + '/:userId/updateImage', {image: newImage})
}



export {getUserInfo, updateUserInfo, deleteUser, updateImage};