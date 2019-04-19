import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import EventForm from "./component/EventForm";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch("/api/events")
      .then(res => res.json())
      .then(events => {
        this.setState({ events });
      });
  }

  render() {
    return (
      <div className="App">
        <Switch>
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

  addEventsHandler = eventInfo => {
    const { events } = this.state;
    events.unshift(eventInfo);
    this.setState({ events });
  };
}

export default App;
