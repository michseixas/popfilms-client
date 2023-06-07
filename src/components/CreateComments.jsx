import React from 'react';
import CommentCard from './CommentCard';

const Comments = ({ comments }) => (
  <div className="comments">
    <h2>Comments</h2>
    {comments && comments.map((comment, index) => (
      <CommentCard
        key={index}
        author={comment.author}
        comment={comment.comment}
      />
    ))}
  </div>
);

export default Comments;
