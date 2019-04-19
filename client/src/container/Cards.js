import React from "react";
import Card from "../component/Card";

const Cards = props => {
  console.log(props.gallery);
  const gallery = props.gallery || [];
  const cards = gallery.map((post, i) => <Card key={i} post={post} />) || [];
  return <div>{cards}</div>;
};

export default Cards;
