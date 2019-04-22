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
      selectedEvent: {}
    };
  }

  componentDidMount() {
    fetch("/api/events")
      .then(res => res.json())
      .then(events => {
        this.setState({ events, selectedEvent: events[0] });
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
    const event = this.state.events.find(event => event.id === id);
    console.log(event);
    this.setState({ selectedEvent: event });
  };

  addEventsHandler = event => {
    const { events } = this.state;
    events.unshift(event);
    this.setState({ events, selectedEvent: event });
  };

  fetchSelectedEvent = eventInfo => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventInfo)
    };
    fetch("/api/hashtag", opts)
      .then(res => res.json())
      .then(event => this.setState({ selectedEvent: event }));
  };
}

export default withRouter(App);
