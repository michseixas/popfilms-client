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
              <Link className="menu-top-link" onClick={handleClose} to="/top250">
                {" "}
                Top 250 Movies
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/mostpopular">
                {" "}
                Most Popular Movies
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/theater">
                {" "}
                Theater Movies
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/comingsoon">
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
              <Link className="menu-top-link" onClick={handleClose} to="/drama">
                Drama
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/comedy">
                Comedy
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/action">
                Action
              </Link>
            </li>
            <li>
              <Link className="menu-top-link" onClick={handleClose} to="/romance">
                Romance
              </Link>
            </li>
          </ul>
        </Col>
        <Col>
          <h2>{" "}<br></br></h2>
          <ul>
            <li>
            <Link className="menu-top-link" onClick={handleClose} to="/animation">
                Animation
              </Link>
            </li>
            <li>
            <Link className="menu-top-link" onClick={handleClose} to="/biography">
                Biography
              </Link>
            </li>
            <li>
            <Link className="menu-top-link" onClick={handleClose} to="/adventure">
                Adventure
              </Link>
            </li>
            <li>
            <Link className="menu-top-link" onClick={handleClose} to="/family">
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
