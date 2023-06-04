import axios from "axios";

import { createContext, useEffect, useState } from "react";

const authContext = createContext();

let baseUrl = 'http://localhost:5005/auth';

function AuthProviderWrapper({children}){
    const [signupOk, setSignupOk] = useState(false); //This always will be false, only during signup it will set up to true.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        isAuthenticated();
    }, []);

    const getHeaders = () => {
        let token = localStorage.getItem('authToken');
        return {headers: {authorization: `Bearer ${token}`}};
    }

    const signupIsOk = () => {
        setSignupOk(true); //This is when the signupOk variable is set to true. This function will be called after successful signup. 
    }

    const signupDone = () => {
        setSignupOk(false); //This is when the signupOk variable is set to false. This will hide the alert if you are already signed up and want to login again.
    }


    const isAuthenticated = () => {
        //get a token:
        let token = localStorage.getItem('authToken');
        if(token) {
            axios.get(baseUrl + '/verify', {headers: {authorization: `Bearer ${token}`}})
            .then(({data}) => {
                setIsLoggedIn(true);
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                setIsLoggedIn(false);
                setUser(null);
                setLoading(false);
            })
        } else {
            setIsLoggedIn(false);
            setUser(null);
            setLoading(false);
        }
    }

    let exposedValues = {
        isLoggedIn,
        user,
        loading,
        isAuthenticated,
        getHeaders,
        signupOk,
        signupIsOk,
        signupDone
    }
    return(<authContext.Provider value={exposedValues}>
        {children}
    </authContext.Provider>);
}

export {authContext, AuthProviderWrapper};