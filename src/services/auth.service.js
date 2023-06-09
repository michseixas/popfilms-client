import axios from 'axios';
let baseUrl = import.meta.env.VITE_API_URL + "/auth";



const signup = (user) => {
    console.log ("get to the signup service..........", user)
    return axios.post(baseUrl + '/signup', user) //user is the content to be posted
    
}

const login = (username, password) => {
    return axios.post(baseUrl + '/login', {username, password})
}


// const logout = () => {
//     return <Navigate to = "/login" />
// }




export {signup, login};