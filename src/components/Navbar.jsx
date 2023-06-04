import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../contexts/auth.context'

const Navbar = () => {
  const { isLoggedIn, user, loading } = useContext(authContext);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand">Popfilms</Link>
        <Link className="navbar-brand">Menu</Link>
        <form className="d-flex flex-grow-1" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        {!loading && isLoggedIn && <>
          <li className="nav-item">
            <span className="navbar-brand">Hi {user.username}!</span>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="navbar-brand">Logout</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="navbar-brand">Profile</Link>
          </li>
        </>}
        {!loading && !isLoggedIn && <>
          <li className="nav-item">
              <Link to='/signup' className="navbar-brand">Signup</Link>
          </li>
          <li className="nav-item">
              <Link to='/login' className="navbar-brand">Login</Link>
          </li>
        </>}
      </div>
    </nav>
  );
};

export default Navbar;
