import React from "react";


const CommentCard = ({author, comment}) => {

  return (
      <div className="card w-75 mb-3">
        <div className="card-body">
          <h5 className="card-title">{author}</h5>
          <p className="card-text">{comment}</p>
        </div>
      </div>
  );
};

export default CommentCard;
