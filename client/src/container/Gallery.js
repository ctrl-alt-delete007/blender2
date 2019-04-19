/* eslint-disable no-unused-vars */
import React from "react";
import GalleryHeader from "../component/GalleryHeader";
import Cards from "./Cards";

const Gallery = props => {
  const searchHandler = q => {
    console.log(q);
  };
  return (
    <div>
      <GalleryHeader
        selectedEvent={props.selectedEvent.event}
        events={props.events}
        searchHandler={searchHandler}
        selectedValueHandler={props.selectedValueHandler}
      />
      <Cards gallery={props.selectedEvent.gallery} />
    </div>
  );
};

export default Gallery;
