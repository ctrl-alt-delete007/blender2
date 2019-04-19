/* eslint-disable no-unused-vars */
import React from "react";
import GalleryHeader from "../component/GalleryHeader";

const Gallery = props => {
  console.log(props.selectedEvent);
  return (
    <div>
      <GalleryHeader
        selectedEvent={props.selectedEvent.event}
        events={props.events}
        selectedValueHandler={props.selectedValueHandler}
      />
    </div>
  );
};

export default Gallery;
