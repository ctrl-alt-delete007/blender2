import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      hashtag: ""
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async clickHandler() {
    let { hashtag } = this.state;

    if (hashtag[0] === "#") {
      hashtag = hashtag.substring(1);
    }

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        hashtag: hashtag
      })
    };

    await fetch("/api/events", opts)
      .then(res => res.json())
      .then(event => this.props.addEventsHandler(event));

    this.props.history.push("/gallery");
  }

  render() {
    return (
      <div className="ui form">
        <div className="fields">
          <div id="event-form" className="field">
            <p>
              <input
                style={{ border: "1px solid #6F767F" }}
                type="text"
                name="name"
                value={this.state.name}
                placeholder="Event Name"
                onChange={this.changeHandler}
                id="name"
              />
            </p>
            <p>
              <input
                style={{ border: "1px solid #6F767F" }}
                type="text"
                name="hashtag"
                placeholder="Hashtag"
                value={this.state.hashtag}
                onChange={this.changeHandler}
                id="hashtag"
              />
            </p>
            <button
              id="btn-event"
              className="fluid ui button"
              onClick={this.clickHandler}
            >
              Start Event
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EventForm);
