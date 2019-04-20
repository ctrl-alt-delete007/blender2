import React from "react";

const Card = props => {
  return (
    <img
      className="ui image"
      style={{ objectFit: "cover", width: "200px", height: "200px" }}
      src={props.post.media_url}
      alt={props.post.screen_name}
    />
  );
};

export default Card;
