import React from "react";

const Card = props => {
  return (
    <div style={{ marginRight: "10px" }} className="wrapper">
      <img
        style={{ objectFit: "cover", width: "200px", height: "200px" }}
        src={props.post.media_url}
        alt={props.post.screen_name}
      />
      <div className="overlay ctr imghov">
        <button>Blue</button>
      </div>
    </div>
  );
};

export default Card;
