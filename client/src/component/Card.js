import React from "react";

const Card = props => {
  return (
    <div>
      <img src={props.post.media_url} alt={props.post.screen_name} />
    </div>
  );
};

export default Card;
