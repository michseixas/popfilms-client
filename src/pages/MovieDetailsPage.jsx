import React, { useState, useEffect , useContext } from "react";
import { likeMovie, dislikeMovie } from "../services/user.service";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/imdb.service";
import CreateComment from "../components/CreateComment";
import MovieDetailInfo from "../components/MovieDetailInfo";
import { authContext } from "../contexts/auth.context";
import axios from "axios";



let baseUrl = "http://localhost:5005/movie";

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
  const goBack = () => {
    window.history.back();
  };

  
  

  useEffect(() => {
    console.log("viendo movieId", movieId);
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
      <MovieDetailInfo movie={movie} movieRating={movieRating} />
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

      <button className="btn btn-success" onClick={() => handleLikeMovie()}>Like</button>
      <button className="btn btn-danger" onClick={() => handleDislikeMovie()}>Dislike</button>
      

      <div>
        <p>{message}</p>
      </div>

      
      
      <div>
        <button onClick={goBack}>Back</button>
      </div>
    

      {!loading && isPremium && ( // Premium Content Here!!!
          <>
            <div>
              <CreateComment
                movieId={movieId}
                addCommentHandler={addCommentHandler}
              />
            </div>
            <div>
              {comments.map((comment, index) => (
                <div key={index}>
                  <p>{comment.comment}</p>
                  <p>{comment.author}</p>
                </div>
              ))}
            </div>

            <div>
              <div>
                <p>Rate the movie:</p>
                <select value={rating || ""} onChange={handleRatingChange}>
                  <option value="">Select rating</option>
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
            {movieRating && <p>Average Rating: {movieRating.toFixed(2)}</p>}
          </>
        )}
    </div>
  );
}

export default MovieDetailsPage;
