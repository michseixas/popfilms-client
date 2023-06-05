import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

function MenuTop() {
    const handleClose = () => setShow(false);
  return (
    <Container>
      <Row>
        <Col>
            <h1>Movies</h1>
            <ul>
                <li><Link onClick={handleClose} to="/moviesListType/top250"> Top 250 Movies</Link></li>
                <li><Link onClick={handleClose} to="/moviesListType/mostpopular"> Most Popular Movies</Link></li>
                <li><Link onClick={handleClose} to="/moviesListType/theater"> Theater Movies</Link></li>
                <li><Link onClick={handleClose} to="/moviesListType/comingsoon"> Coming Soon</Link></li>
            </ul>
        </Col>
        <Col>
        <h1>Movies by Genre</h1>
            <ul>
                <li>Drama</li>
                <li>Comedy</li>
                <li>Action</li>
                <li>Romance</li>
            </ul>
        </Col>
        <Col>
        <h1>Celebrities</h1>
            <ul>
                <li>Drama</li>
                <li>Comedy</li>
                <li>Action</li>
                <li>Romance</li>
            </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default MenuTop;