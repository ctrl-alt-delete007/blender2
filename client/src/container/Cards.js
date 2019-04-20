import React from "react";
import Card from "../component/Card";

const Cards = props => {
  const gallery = props.gallery || [];
  const cards = gallery.map((post, i) => <Card key={i} post={post} />) || [];
  return <div className="ui small images">{cards}</div>;
};

export default Cards;
