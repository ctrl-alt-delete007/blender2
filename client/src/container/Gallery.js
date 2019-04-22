/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import GalleryHeader from "../component/GalleryHeader";
import Cards from "./Cards";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: ""
    };
  }

  searchHandler = q => {
    console.log(q);
    this.setState({ q });
  };

  render() {
    console.log(this.props.selectedEvent);
    const gallery = this.props.selectedEvent.gallery || [];
    const filteredGallery = gallery.filter(tweet =>
      tweet.screen_name.toLowerCase().includes(this.state.q.toLowerCase())
    );
    return (
      <React.Fragment>
        <GalleryHeader
          selectedEvent={this.props.selectedEvent.event}
          events={this.props.events}
          searchHandler={this.searchHandler}
          selectedValueHandler={this.props.selectedValueHandler}
        />

        <Cards gallery={filteredGallery} />
      </React.Fragment>
    );
  }
}

export default Gallery;
