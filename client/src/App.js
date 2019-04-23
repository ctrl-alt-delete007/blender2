import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import EventForm from "./component/EventForm";
import Gallery from "./container/Gallery";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      selectedEvent: {},
      filteredGallery: [],
      loaded: false
    };
  }

  componentDidMount() {
    console.log("CDM");
    fetch("/api/events")
      .then(res => res.json())
      .then(events => {
        this.setState(
          {
            events,
            selectedEvent: { event: events[0] }
          },
          this.fetchSelectedEvent(events[0])
        );
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // if (
    //   prevState.selectedEvent.event === undefined &&
    //   this.state.events.length > 0
    // ) {
    //   this.setState({ selectedEvent: { event: this.state.events[0] } });
    // } else {
    //   this.fetchSelectedEvent(this.state.selectedEvent.event);
    // }
    console.log(this.state.selectedEvent, prevState.selectedEvent);
    if (prevState.selectedEvent.event !== undefined) {
      if (
        prevState.selectedEvent.event.id !== this.state.selectedEvent.event.id
      ) {
        console.log(this.state.selectedEvent);
        // this.fetchSelectedEvent(this.state.selectedEvent.event);
      }
    }
  }

  render() {
    console.log(
      "app render",
      this.state.loaded,
      this.state.events,
      this.state.selectedEvent
    );
    if (!this.state.loaded && this.state.events.length < 1) {
      console.log(this.state.selectedEvent, this.state.events[0]);
      fetch("/api/events")
        .then(res => res.json())
        .then(events => {
          this.setState(
            {
              events,
              loaded: true,
              selectedEvent: { event: events[0] }
            },
            this.fetchSelectedEvent(events[0])
          );
        });
      return null;
    }

    return (
      <div className="App">
        <Switch>
          <Route
            path="/gallery"
            render={() => (
              <Gallery
                selectedEvent={this.state.selectedEvent.event}
                events={this.state.events}
                q={this.state.q}
                searchHandler={this.searchHandler}
                changeHandler={this.changeHandler}
                filteredGallery={this.state.filteredGallery}
                selectedValueHandler={this.selectedValueHandler}
                fetchSelectedEvent={this.fetchSelectedEvent}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <EventForm
                addEventsHandler={this.addEventsHandler}
                fetchSelectedEvent={this.fetchSelectedEvent}
              />
            )}
          />
        </Switch>
      </div>
    );
  }

  selectedValueHandler = id => {
    const event = this.state.events.find(event => parseInt(event.id) === id);
    console.log(event);
    this.setState({ selectedEvent: { event } }, this.fetchSelectedEvent(event));
  };

  addEventsHandler = event => {
    const { events } = this.state;
    events.unshift(event);
    this.setState({ events, selectedEvent: { event } });
  };

  fetchSelectedEvent = eventInfo => {
    console.log(eventInfo);
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventInfo)
    };
    fetch("/api/hashtag", opts)
      .then(res => res.json())
      .then(event =>
        this.setState(
          {
            selectedEvent: { event: { ...eventInfo, ...event } },
            filteredGallery: event.gallery
          },
          console.log(event)
        )
      );
  };

  changeHandler = q => {
    this.setState({
      q
    });
  };

  searchHandler = () => {
    const filteredGallery = this.state.selectedEvent.gallery.filter(tweet =>
      tweet.screen_name.toLowerCase().includes(this.state.q.toLowerCase())
    );

    console.log(filteredGallery, this.state.selectedEvent.gallery);

    this.setState({ filteredGallery });
  };
}

export default withRouter(App);
