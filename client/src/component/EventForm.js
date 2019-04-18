import React, { Fragment, Component } from "react";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      hashtag: ""
    };
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  clickHandler = () => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        hashtag: this.state.hashtag
      })
    };

    fetch("/api/events", opts)
      .then(res => res.json())
      .then(event => this.props.addEventsHandler(event));
  };

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

export default EventForm;
