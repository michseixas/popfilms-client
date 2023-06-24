import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function MenuTop() {
  const handleClose = () => setShow(false);
  return (
    <Container className="bg-dark text-white">
      <Row>
        <Col>
          <h2>Movies</h2>
          <ul>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/lists/top250">
                {" "}
                Top 250 Movies
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/lists/mostpopular">
                {" "}
                Most Popular Movies
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/lists/theater">
                {" "}
                Theater Movies
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/lists/comingsoon">
                {" "}
                Coming Soon
              </Link>
            </li>
          </ul>
        </Col>
        <Col>
          <h2>Movies by Genre</h2>
          <ul>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/lists/drama">
                Drama
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/lists/comedy">
                Comedy
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/lists/action">
                Action
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/lists/romance">
                Romance
              </Link>
            </li>
          </ul>
        </Col>
        <Col>
          <h2>{" "}<br></br></h2>
          <ul>
            <li>
            <Link className="menu-top-link" onClick={handleClose} to="/lists/animation">
                Animation
              </Link>
            </li>
            <li>
            <Link className="menu-top-link" onClick={handleClose} to="/lists/biography">
                Biography
              </Link>
            </li>
            <li>
            <Link className="menu-top-link" onClick={handleClose} to="/lists/adventure">
                Adventure
              </Link>
            </li>
            <li>
            <Link className="menu-top-link" onClick={handleClose} to="/lists/family">
                Family
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default MenuTop;
