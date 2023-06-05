import React from 'react';
import { likeMovie } from '../services/user.service';

function MovieDetailsPage() {
  const handleLikeMovie = () => {
    // Call the likeMovie function
    likeMovie()
      .then(response => {
        // Handle the successful response
        console.log('Movie liked successfully.');
      })
      .catch(error => {
        // Handle the error
        console.log('Error liking the movie:', error);
      });
  };

  return (
    <div>
      <h1>Movies detail page!!!!</h1>
      <button onClick={handleLikeMovie}>Like</button>
    </div>
  );
}

export default MovieDetailsPage;
