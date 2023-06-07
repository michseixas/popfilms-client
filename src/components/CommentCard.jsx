import React from "react";


const CommentCard = ({author, comment}) => {

  return (
    <div>
      <div class="card w-75 mb-3">
        <div class="card-body">
          <h5 class="card-title">{author}</h5>
          <p class="card-text">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
