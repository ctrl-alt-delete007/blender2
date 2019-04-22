import React, { Component } from "react";

class GalleryHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      q: ""
    };
  }

  render() {
    const events = this.props.events || [{ name: "" }];
    const selectOptions = events.map((event, i) => (
      <option key={i} value={event.id}>
        {event.name}
      </option>
    ));

    const { name, hashtag, posts, users } = this.props.selectedEvent || {
      name: "",
      hashtag: "",
      posts: 0,
      users: 0
    };

    return (
      <div id="gallery-header-container">
        <div className="gallery-header-child">
          <h1>{name}</h1>
        </div>

        <div className="gallery-header-child">
          <div className="gallery-hc-node">
            <p>
              <span>#{hashtag} </span>
              <span>
                <span>{posts}</span> Posts // <span>{users}</span> Users
              </span>
            </p>
          </div>
          <div className="gallery-hc-node">
            <label id="select-event-dropdown-label" htmlFor="selectedEvent">
              Event Name
            </label>
            <select
              id="select-event-dropdown"
              name="selectedEvent"
              value={this.props.selectedEvent.id}
              onChange={e => this.props.selectedValueHandler(e.target.value)}
            >
              {selectOptions}
            </select>
          </div>
          <div className="gallery-hc-node">
            <input
              type="text"
              name="q"
              id="q"
              value={this.state.q}
              onChange={this.changeHandler}
              placeholder="search user post"
            />{" "}
            <br />
            <button
              className="compact ui black button"
              onClick={() => this.props.searchHandler(this.state.q)}
            >
              search
            </button>
          </div>
        </div>
      </div>
    );
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

export default GalleryHeader;
