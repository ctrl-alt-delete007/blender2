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
      selectedEvent: { event: { name: "", hashtag: "" } }
    };
  }

  componentDidMount() {
    fetch("https://blenderapp.herokuapp.com:5000/api/events")
      .then(res => res.json())
      .then(events => {
        this.setState({ events });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedEvent.event.name === undefined &&
      this.state.events.length > 0
    ) {
      this.setState({ selectedEvent: { event: this.state.events[0] } });
    }

    if (
      prevState.selectedEvent.event.id !== this.state.selectedEvent.event.id
    ) {
      this.fetchSelectedEvent(this.state.selectedEvent.event);
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/gallery"
            render={() => (
              <Gallery
                selectedEvent={this.state.selectedEvent}
                events={this.state.events}
                selectedValueHandler={this.selectedValueHandler}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <EventForm addEventsHandler={this.addEventsHandler} />
            )}
          />
        </Switch>
      </div>
    );
  }

  selectedValueHandler = id => {
    const selectedEvent = {
      event: this.state.events.find(event => event.id === id)
    };
    this.setState({ selectedEvent });
  };

  addEventsHandler = eventInfo => {
    const { events } = this.state;
    events.unshift(eventInfo);
    this.setState({ events, selectedEvent: { event: eventInfo } });
  };

  fetchSelectedEvent = eventInfo => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventInfo)
    };
    fetch("https://blenderapp.herokuapp.com:5000/api/hashtag", opts)
      .then(res => res.json())
      .then(event => this.setState({ selectedEvent: event }));
  };
}

export default withRouter(App);
