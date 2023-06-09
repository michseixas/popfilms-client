import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../contexts/auth.context";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';


let baseUrl = import.meta.env.VITE_API_URL + "/movie";

const CreateComment = ({ movieId, addCommentHandler }) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(authContext); // get the user token so we can access it's ID, to use it in the comment author
  const [author, setAuthor] = useState(user.username);

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
    setAuthor(user.username);

    // Force a Reload to refresh the comment list
    window.location.reload();
  };

  return (
    <>
    <Stack direction="horizontal" gap={3}>
      <Form.Control 
        className="me-auto" 
        placeholder="Add your comment here..." 
        id="comment" 
        onChange={(event) => setComment(event.target.value) }
      />
      <Button variant="dark" onClick={handleSubmit}>Submit</Button>
    </Stack>
   <br></br>
   </>


  );
};

export default CreateComment;
