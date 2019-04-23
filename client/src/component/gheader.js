import React from "react";
import GalleryHeader from "../component/GalleryHeader";
import Cards from "./Cards";

const Gallery = props => {
  return (
    <React.Fragment>
      <GalleryHeader
        selectedEvent={props.selectedEvent.event || {}}
        events={props.events}
        searchHandler={props.searchHandler}
        selectedValueHandler={props.selectedValueHandler}
        q={props.q}
        changeHandler={props.changeHandler}
      />

      <Cards gallery={props.filteredGallery} />
    </React.Fragment>
  );
};

export default Gallery;
