import axios from 'axios';
let baseUrl = 'http://localhost:5005/user';


//this function will be called on the front end on the page that we need. In this case, the user profile
const getUserInfo = () => {
    return axios.get(baseUrl + '/:userId')
    
}




export {getUserInfo};