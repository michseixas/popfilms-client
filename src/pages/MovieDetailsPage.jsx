import React, { useState, useEffect } from "react";
import { likeMovie } from "../services/user.service";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/imdb.service";
import MovieDetailInfo from "../components/MovieDetailInfo";

function MovieDetailsPage() {
  //state variables section: store and update the data of the component
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("viendo movieId", movieId);
    getMovieDetails(movieId)
      .then((resp) => {
        console.log("results: ", resp.data);
        setMovie(resp.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLikeMovie = () => {
    // Call the likeMovie function
    likeMovie()
      .then((response) => {
        // Handle the successful response
        console.log("Movie liked successfully.");
      })
      .catch((error) => {
        // Handle the error
        console.log("Error liking the movie:", error);
      });
  };

  return (
    <div>
      <br />
      <MovieDetailInfo movie={movie} />

      {loading && (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {/* This became the MovieDetailInfo component above */}
      {/* {!loading && <div className="card">
          <img src={movie.image} className="card-img-top" alt={movie.title} />
          <div className="card-body">
              <h1 className="card-title">{movie.title}</h1>
              <p className="card-text"> {movie.plot}</p>
          </div>
      </div>} */}

      <button onClick={() => handleLikeMovie()}>Like</button>
      <div>
        <Link to="/movieListPage">Go back</Link>
      </div>
      <br />
    </div>
  );
}

export default MovieDetailsPage;
