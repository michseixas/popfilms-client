import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuTop from "../components/MenuTop";
import FilterForm from "./FilterForm";
import filterMovies from "../pages/MoviesListPage"



const Navbar = () => {
  const { isLoggedIn, user, loading, isPremium } = useContext(authContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filteredMovies, setFilteredMovies] = useState([]); 

  // filters a list of movies based on a text input and update the filtered movies state or variable.
  const filteredSearch = (text) => {
    if (text === "") {
      setFilteredMovies(movies); // Set filteredMovies to the complete array of movies
    } else {
      filterMovies
      // setFilteredMovies(
      //   movies.filter((movie) =>
      //     movie.title.toLowerCase().includes(text.toLowerCase())
      //   )
      // );
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand"><img className="poplogoNav" src="/images/popfilmslogoNav.png"/> </Link>
        <Button variant="primary" onClick={handleShow} className="me-2">
          Menu
        </Button>
        {/* //Key, placement and name are fixed properties of the off-canvas component */}
        <Offcanvas className="offcanvas-top"  show={show} onHide={handleClose} key="top" placement="top" name="top"> 
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Popfilms</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <MenuTop/>
          </Offcanvas.Body>
        </Offcanvas>
        {/* <form className="d-flex flex-grow-1" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form> */}
        <FilterForm />
        {!loading && isLoggedIn && (
          <>
            <li className="nav-item">
              <span className="navbar-brand">Hi {user.username}! &nbsp; {(isPremium ? <img src="/images/vidicon-2-fill.png"/> : " ")}</span>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="navbar-brand">
                Logout
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="navbar-brand">
                Profile
              </Link>
            </li>
          </>
        )}
        {!loading && !isLoggedIn && (
          <>
            <li className="nav-item">
              <SignupModal />
            </li>
            <li className="nav-item">
              <LoginModal />
            </li>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;