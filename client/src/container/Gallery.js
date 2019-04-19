/* eslint-disable no-unused-vars */
import React from "react";
import GalleryHeader from "../component/GalleryHeader";

const Gallery = props => {
  return (
    <div>
      <GalleryHeader
        selectedEvent={props.selectedEvent}
        events={props.events}
        selectedValueHandler={props.selectedValueHandler}
      />
    </div>
  );
};

export default Gallery;
