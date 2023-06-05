import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuTop from "../components/MenuTop";

const Navbar = () => {
  const { isLoggedIn, user, loading } = useContext(authContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Popfilms</Link>
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
        <form className="d-flex flex-grow-1" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        {!loading && isLoggedIn && (
          <>
            <li className="nav-item">
              <span className="navbar-brand">Hi {user.username}!</span>
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
