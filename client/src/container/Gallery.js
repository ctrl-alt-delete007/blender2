/* eslint-disable no-unused-vars */
import React from "react";
import GalleryHeader from "../component/GalleryHeader";
import Cards from "./Cards";
import { Segment, Responsive } from "semantic-ui-react";

const Gallery = props => {
  const searchHandler = q => {
    console.log(q);
  };
  return (
    <React.Fragment>
      <GalleryHeader
        selectedEvent={props.selectedEvent.event}
        events={props.events}
        searchHandler={searchHandler}
        selectedValueHandler={props.selectedValueHandler}
      />

      <Cards gallery={props.selectedEvent.gallery} />
    </React.Fragment>
  );
};

export default Gallery;
