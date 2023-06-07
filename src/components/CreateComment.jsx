import React, { useState } from "react";
import axios from "axios";

let baseUrl = "http://localhost:5005/movie";

const CreateComment = ({ movieId, addCommentHandler }) => {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  // addCommentHandler({ author, comment });

  const handleSubmit = (event) => {
    // event.preventDefault();

    axios
      .post(baseUrl + "/" + movieId + "/addComment", { author, comment })

      .then((response) => {
        console.log("New comment:", response.data); // Adding the comment to the list of comments
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
    setAuthor("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateComment;
