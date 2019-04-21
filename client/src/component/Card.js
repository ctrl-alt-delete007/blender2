import React from "react";

const Card = props => {
  const oneDay = 24 * 60 * 60 * 1000;
  const dateNow = new Date();
  const datePosted = new Date(props.post.created_at);
  const daysAgo = Math.round(
    Math.abs((dateNow.getTime() - datePosted.getTime()) / oneDay)
  );
  const postedDaysAgo =
    daysAgo === 0
      ? "< 1 day ago"
      : daysAgo === 1
      ? "1 day ago"
      : `${daysAgo} days ago`;
  return (
    <div style={{ marginRight: "10px" }} className="wrapper">
      <img
        style={{ objectFit: "cover", width: "200px", height: "200px" }}
        src={props.post.media_url}
        alt={props.post.screen_name}
      />
      <div className="overlay ctr imghov">
        <span>
          <img
            className="ui avatar image"
            src={props.post.profile_image_url}
            alt={props.post.screen_name}
          />
          <span style={{ color: "white" }}>
            {props.post.screen_name}
            <br />
            {postedDaysAgo}
          </span>
        </span>
        <button>Blue</button>
      </div>
    </div>
  );
};

export default Card;
