import React from "react";
import { Container } from "react-bootstrap";
import Card from 'react-bootstrap/Card';


const CommentCard = ({author, comment}) => {

  return (
    <>
      <Container>
        <Card className="bg-dark text-white">
          <Card.Body><b>{author}:</b> {comment}</Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CommentCard;
