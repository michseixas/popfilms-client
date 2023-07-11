import { Container, Row, Col } from "react-bootstrap";
import Stars from "./Stars";

function MovieDetailInfo({ movie, movieRating }) {
  return (
    <Container>
      <Row>
        <Col lg={5} className="offset-lg-1">
          <img
            src={movie.image}
            loading="lazy"
            alt={movie.title}
            style={{ maxWidth: "70%" }}
          />
        </Col>
        <Col lg={4}>
          <div>
            <h1>{movie.title}</h1>
          </div>
          <div>
            <p>{movie.year}</p>
          </div>
          <div>
            <p>{movie.directors}</p>
          </div>
          <div>
            <p>{movie.plot}</p>
          </div>
          <div>
            <p>{movie.stars}</p>
          </div>
          <div>
            <p>{movie.genres}</p>
          </div>
          {movieRating !== null && <p>Average Rating: {movieRating.toFixed(2)}</p>}
          
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDetailInfo;
