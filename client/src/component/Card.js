import React from "react";
import { Icon } from "semantic-ui-react";
import twitter from "../twitter.png";

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
            style={{ top: "7px", position: "absolute", left: "14px" }}
            className="ui avatar image user"
            src={props.post.profile_image_url}
            alt={props.post.screen_name}
          />
          <span style={{ color: "white" }}>
            <span
              style={{ top: "12px", position: "absolute", left: "47px" }}
              className="card-screen-name"
            >
              {props.post.screen_name}
            </span>
            <br />
            <span
              style={{ position: "absolute", top: "25px", left: "45px" }}
              className="card-days-ago"
            >
              {postedDaysAgo}
            </span>
            <img
              style={{ position: "absolute", top: "10px", right: "10px" }}
              src={twitter}
              alt="twitter"
            />
          </span>
        </span>
        <a href={props.post.url} target="_blank">
          <button className="btn-post btnhov">
            <span className="btn-text">View Post</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Card;
