import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuTop from "../components/MenuTop";
import FilterForm from "./FilterForm";
import filterMovies from "../pages/MoviesListPage";
import { Container, Row, Col } from "react-bootstrap";
import { Menu } from 'lucide-react';

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
      filterMovies;
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-black text-white"
      data-bs-theme="dark"
    >
      <Container>
        <Row className="full-width-row" >
          <Col xs={2} className="left-column">
            <Link to="/" className="navbar-brand">
              <img className="poplogoNav" src="/images/popfilmslogoNav.png" />{" "}
            </Link>
          </Col>
          <Col xs={2} className="left-column">
            <Button variant="dark" onClick={handleShow} className="me-2">
            <Menu size={30} color="#ffffff" />
            </Button>
          </Col>
          {/* //Key, placement and name are fixed properties of the off-canvas component */}
          <Offcanvas 
            className="bg-dark text-white"
            style={{height:'40vh'}}
            show={show}
            onHide={handleClose}
            key="top"
            placement="top"
            name="top"
          >
            <Offcanvas.Header closeButton closeVariant="white" >
              <Offcanvas.Title>Popfilms</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <MenuTop />
            </Offcanvas.Body>
          </Offcanvas>
          <Col xs={4} className="middle-column">
            <FilterForm />
            {!loading && isLoggedIn && (
              <span className="navbar-brand">
                Hi {user.username}! &nbsp;
                {isPremium ? <img src="/images/vidicon-2-fill.png" /> : ""}
              </span>
            )}
          </Col>
          {!loading && isLoggedIn && (
            <>
              <Col xs={2} className="right-column">
                <Button as={Link} variant="dark" to="/logout">
                  Logout
                </Button>
              </Col>
              <Col  xs={2} className="right-column">
                <Button as={Link} variant="dark" to="/profile">
                  Profile
                </Button>
              </Col>
</>
          )}
          {!loading && !isLoggedIn && (
            <>
              <Col xs={2} className="right-column">
                <SignupModal />
              </Col>
              <Col xs={2} className="right-column">
                <LoginModal />
              </Col>
            </>
          )}
        </Row>
      </Container>
    </nav>
  );
};

export default Navbar;
