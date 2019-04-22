import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      hashtag: "",
      error: false
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.name.length > 0 &&
      this.state.hashtag.length > 0 &&
      this.state.error &&
      this.state.error
    ) {
      this.setState({ error: false });
    }
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async clickHandler() {
    let { name, hashtag } = this.state;

    if (name.length === 0) {
      this.setState({ error: true });
      return;
    }

    if (hashtag.length === 0) {
      this.setState({ error: true });
      return;
    }

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

    await fetch("http://134.209.79.159:5000/api/events", opts)
      .then(res => res.json())
      .then(event => this.props.addEventsHandler(event));

    this.props.history.push("/gallery");
  }

  render() {
    return (
      <div>
        <div className="fields">
          <div id="event-form" className="field">
            <span
              style={{
                color: "red",
                display: this.state.error ? "inline" : "none",
                margin: "0px 0px 0px 70px"
              }}
            >
              Both fields are required!
            </span>
            <p>
              <input
                style={{ border: "1px solid #6F767F", borderRadius: "15px" }}
                className="input-text-form"
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
                style={{ border: "1px solid #6F767F", borderRadius: "15px" }}
                className="input-text-form"
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
              className="ui button"
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
