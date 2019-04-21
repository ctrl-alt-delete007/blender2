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
      <div>
        <div>
          <h1 id="header-event-name">{name}</h1>
        </div>

        <div className="gallery-second-header">
          <div
            style={{ alignSelf: "flex-start" }}
            className="gallery-second-header-child"
          >
            <p>
              <span id="header-hashtag">#{hashtag} </span>
              <span id="header-postuser-container">
                <span className="header-posts-users">{posts}</span> Posts //{" "}
                <span className="header-posts-users">{users}</span> Users
              </span>
            </p>
          </div>
          <div
            style={{ marginTop: "-15px" }}
            className="gallery-second-header-child"
          >
            <label
              style={{ paddingRight: "10px", fontWeight: "bold" }}
              htmlFor="selectedEvent"
            >
              Event Name
            </label>
            <select
              className="ui dropdown"
              name="selectedEvent"
              value={this.props.selectedEvent.id}
              onChange={e => this.props.selectedValueHandler(e.target.value)}
            >
              {selectOptions}
            </select>
          </div>
          <div
            style={{ alignSelf: "flex-end", marginRight: "-120px" }}
            className="gallery-second-header-child"
          >
            <input
              type="text"
              name="q"
              id="q"
              value={this.state.q}
              onChange={this.changeHandler}
              placeholder="search user post"
            />
            <button onClick={() => this.props.searchHandler(this.state.q)}>
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
