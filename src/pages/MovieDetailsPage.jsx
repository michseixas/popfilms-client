import React, { useState, useEffect } from "react";
import { likeMovie } from "../services/user.service";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/imdb.service";
import CreateComment from "../components/CreateComment";
import MovieDetailInfo from "../components/MovieDetailInfo";
// import axios from "axios";

let baseUrl = "https://imdb-api.com/en/API";

function MovieDetailsPage() {
  //state variables section: store and update the data of the component
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

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

  // You have to add the handler for "addComment" on MoviesDetailPage because you said on App.jsx routes that the place where you handle the addComment post in the CreateComment component, is this MoviesDetailsPage. Now, when adding the handler for the "addComment", you need to connect to the server and send a post to the server route that handles the creation of a comment (server in movie.routes.js). Don't forget to add the server URL at the top (look at how you added users to the DB and/or how you EDIT user profile)

  // const addCommentHandler = (commentData) => {
  //   axios
  //     .post(baseUrl + "/" + movieId + "/addComment", commentData)
  //     .then((response) => {
  //       console.log('Comment added successfully:', response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error adding comment:', error);
  //     });
  // };

  // useEffect(() => {
  //   getCommentsForMovie(movieId)
  //     .then((resp) => {
  //       console.log("comments: ", resp.data);
  //       setComments(resp.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [movieId]);

  // const getCommentsForMovie = (movieId) => {
  //   return axios
  //     .get(`/api/comments/${movieId}`)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       throw error;
  //     });
  // };

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

      <CreateComment movieId={movieId} />
      {/* {movie.comments && <Comments comments={movie.comments} />} */}
    </div>
  );
}

export default MovieDetailsPage;
