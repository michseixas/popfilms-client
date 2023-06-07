import React, { useState } from 'react';
import axios from 'axios';

let baseUrl = "https://imdb-api.com/en/API"

const CreateComment = ({ movieId }) => {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(baseUrl + "/" + movieId + "/addComment", { author, comment })
      
      .then((response) => {
        console.log('New comment:', response.data); // Adding the comment to the list of comments 
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
    setAuthor('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        placeholder="Author"
      />
      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Comment"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateComment;

