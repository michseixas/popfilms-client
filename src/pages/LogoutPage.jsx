import { useContext, useEffect } from 'react'
import { authContext } from '../contexts/auth.context';
import { Navigate } from 'react-router-dom';

 function LogoutPage() {

    const {isAuthenticated} = useContext(authContext);
    
    useEffect(()=>{
        localStorage.removeItem('authToken');
        isAuthenticated();
    }, []);

  return (
    <Navigate to="/" />
  )
}

export default LogoutPage;
