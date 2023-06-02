import axios from 'axios';
let baseUrl = 'http://localhost:5005/auth';



const signup = (username, email, password) => {
    return axios.post(baseUrl + '/signup', {username, email, password})
}

const login = (username, password) => {
    return axios.post(baseUrl + '/login', {username, password})
}


// const logout = () => {
//     return <Navigate to = "/login" />
// }




export {signup, login};