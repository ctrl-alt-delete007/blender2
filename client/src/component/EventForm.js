import React, { Fragment, Component } from "react";
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
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        hashtag: this.state.hashtag
      })
    };

    await fetch("/api/events", opts)
      .then(res => res.json())
      .then(event => this.props.addEventsHandler(event));

    this.props.history.push("/gallery");
  }

  render() {
    return (
      <Fragment>
        <p>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.changeHandler}
            id="name"
          />
        </p>
        <p>
          <input
            type="text"
            name="hashtag"
            value={this.state.hashtag}
            onChange={this.changeHandler}
            id="hashtag"
          />
        </p>
        <button onClick={this.clickHandler}>Submit</button>
      </Fragment>
    );
  }
}

export default withRouter(EventForm);
