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
      loaded: false,
      q: ""
    };
  }

  componentDidMount() {
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

  render() {
    if (!this.state.loaded && this.state.events.length < 1) {
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
    this.setState({ selectedEvent: { event } }, this.fetchSelectedEvent(event));
  };

  addEventsHandler = event => {
    const { events } = this.state;
    events.unshift(event);
    this.setState({ events, selectedEvent: { event } });
  };

  fetchSelectedEvent = eventInfo => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventInfo)
    };
    fetch("/api/hashtag", opts)
      .then(res => res.json())
      .then(event =>
        this.setState({
          selectedEvent: { event: { ...eventInfo, ...event } },
          filteredGallery: event.gallery
        })
      );
  };

  changeHandler = q => {
    this.setState({
      q
    });
  };

  searchHandler = () => {
    const filteredGallery = this.state.selectedEvent.event.gallery.filter(
      tweet =>
        tweet.screen_name.toLowerCase().includes(this.state.q.toLowerCase())
    );

    this.setState({ filteredGallery });
  };
}

export default withRouter(App);
