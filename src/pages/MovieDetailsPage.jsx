import React, { useState, useEffect, useContext } from "react";
import { likeMovie, dislikeMovie } from "../services/user.service";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/imdb.service";
import CreateComment from "../components/CreateComment";
import MovieDetailInfo from "../components/MovieDetailInfo";
import { authContext } from "../contexts/auth.context";
import { Container, Row, Col } from "react-bootstrap";
import CommentCard from "../components/CommentCard";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from 'react-bootstrap/Popover'
import axios from "axios";
import Stars from "../components/Stars";

let baseUrl = import.meta.env.VITE_API_URL + "/movie";

function MovieDetailsPage() {
  //state variables section: store and update the data of the component
  const { isLoggedIn, user, isPremium } = useContext(authContext);
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(null);
  const [fetchingRating, setFetchingRating] = useState(true);
  const [submitMessage, setSubmitMessage] = useState("");
  const [movieRating, setMovieRating] = useState(null);
  const [message, setMessage] = useState("");
  // const goBack = () => {
  //   window.history.back();
  // };

  useEffect(() => {
    getMovieDetails(movieId)
      .then((resp) => {
        console.log("results: ", resp.data);
        setMovie(resp.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    axios
      .get(baseUrl + "/" + movieId + "/getComments")
      .then((response) => {
        const data = response.data;
        setComments(data.comments);
        setCount((count) => count + 1);
      })
      .catch((error) => {
        console.log(error);
      });

    //Fetching the rating for the movie
    axios
      .get(baseUrl + "/" + movieId + "/rating") //get request from API by Id of the movie
      .then((response) => {
        const data = response.data; //data from the server(rating info)
        setFetchingRating(false); //update rating in the state to false so rating is fetched

        // Calculate average rating
        const ratings = data.rating.ratings.map((rating) => rating); // Extract the rating values
        const sum = ratings.reduce((total, rating) => total + rating, 0); // Sum all the ratings

        const average = sum / ratings.length; // Calculate the average

        setMovieRating(average); // Set the average rating in the state
      })
      .catch((error) => {
        console.log(error);
        setFetchingRating(false);
      });
  }, [movieId]);

  const handleLikeMovie = () => {
    // Call the likeMovie function
    likeMovie(movieId)
      .then((response) => {
        console.log(response);
        console.log("Movie liked successfully.");
        setMessage("I like this movie");
        setTimeout(() => setMessage(""), 4000);
      })
      .catch((error) => {
        console.log("Error liking the movie:", error);
      });
  };

  const handleDislikeMovie = () => {
    dislikeMovie(movieId)
      .then((response) => {
        console.log(response);
        console.log("Movie disliked successfully.");
        setMessage("I don't like this movie");
        setTimeout(() => setMessage(""), 4000);
      })
      .catch((error) => {
        console.log("Error disliking the movie:", error);
      });
  };

  const addCommentHandler = (commentData) => {
    axios
      .post(baseUrl + "/" + movieId + "/addComment", commentData)
      .then((response) => {
        console.log("Comment added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };
  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value)); //change the value of rating
  };

  useEffect(() => {
    console.log("rating", rating);
  }, [movieRating]);

  const handleRatingsSubmit = () => {
    if (rating === 0 || rating === null) {
      //No rating available
      console.log("Please select a rating."); //select a rating
      return;
    }
    console.log("Submitting rating:", rating); //submit rating

    axios
      .post(baseUrl + "/" + movieId + "/rate", { rating: rating }) //send axios.post request to backend route
      .then((response) => {
        console.log("response from addrating", response.data); //see data from backend
        const allRatingsResp = response.data.rating.ratings; // extract the allRatingsResp from the response

        const ratings = allRatingsResp.map((rating) => rating); // Extract the rating values
        const sum = ratings.reduce((total, rating) => total + rating, 0); // Sum all the ratings

        const average = sum / ratings.length; // Calculate the average

        setMovieRating(average); // Set the average rating in the state

        setMovieRating(allRatings); // update the movieRating state with the averageRating
        setSubmitMessage("Rating submitted successfully"); // update the submitMessage
      })
      .catch((error) => {
        console.error("Error submitting rating:", error);
      });
  };

  return (
    <div className="bg-black text-white">
      <br />
      {/* <MovieDetailInfo movie={movie} movieRating={movieRating} /> */}
      <Container>
        <Row>
          <Col lg={5} className="offset-lg-1">
            <Row className="likeDislike">
              <img
                src={movie.image}
                loading="lazy"
                alt={movie.title}
                style={{ maxWidth: "70%" }}
              />
            </Row>
            <br></br>

            {!loading &&
              isLoggedIn && ( // if logged in, will see the like dislike buttons
                <>
                  <div className="likeDislike">
                    <button
                      className="btn btn-success"
                      onClick={() => handleLikeMovie()}
                    >
                      Like
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDislikeMovie()}
                    >
                      Dislike
                    </button>
                  </div>
                  <br></br>
                  <div className="likeDislike">
                    <p>{message}</p>
                  </div>
                </>
              )}

            {!loading &&
              !isLoggedIn && ( // if not logged in, like and dislike button invite to signup
                <>
                  <div className="likeDislike">
                  <OverlayTrigger
                    overlay={<Popover id="tooltip-disabled">&nbsp;&nbsp; Signup to like this movie! &nbsp;&nbsp; </Popover>}
                  >
                    <span className="d-inline-block">
                      <Button className="btn btn-success" disabled style={{ pointerEvents: "none" }}>
                      Like
                      </Button>
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    overlay={<Popover id="tooltip-disabled">&nbsp;&nbsp; Signup to like this movie! &nbsp;&nbsp;</Popover>}
                  >
                    <span className="d-inline-block">
                      <Button className="btn btn-danger" disabled style={{ pointerEvents: "none" }}>
                      Dislike
                      </Button>
                    </span>
                  </OverlayTrigger>
                    
                  </div>
                </>
              )}
          </Col>
          <Col lg={4}>
            <div>
              <h1>{movie.title}</h1>
            </div>
            <hr></hr>
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
            {movieRating && <p>Average Rating: <Stars rating={movieRating} /> ({movieRating.toFixed(2)})</p>}
            
            {!loading &&
              isPremium && ( // Premium Content Here!!!
                <div>
                  <div>
                    <p>Rate the movie:</p>
                    <select value={rating || ""} onChange={handleRatingChange}>
                      <option value="">Select rating:</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <div>{submitMessage}</div>
                    <button onClick={handleRatingsSubmit}>Submit Rating</button>
                  </div>
                </div>
              )}
          </Col>
        </Row>
        <hr></hr>
      </Container>
      {loading && (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {/* <div>
        <button onClick={goBack}>Back</button>
      </div> */}

      {!loading &&
        isPremium && ( // Premium Content Here!!!
          <>
            <div>
              <CreateComment
                movieId={movieId}
                addCommentHandler={addCommentHandler}
              />
            </div>
          </>
        )}
      <>
        <div>
          {comments.map((comment, index) => (
            <CommentCard author={comment.author} comment={comment.comment} />
          ))}
        </div>
        <br />
      </>
    </div>
  );
}

export default MovieDetailsPage;
