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
      <div className="flex-container">
        <div className="flex-item">
          <h1 id="header-event-name">{name}</h1>
          <p>
            <span id="header-hashtag">#{hashtag} </span>
            <span id="header-postuser-container">
              <span className="header-posts-users">{posts}</span> Posts //{" "}
              <span className="header-posts-users">{users}</span> Users
            </span>
          </p>
        </div>

        <div className="flex-item">
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

          <p>
            <select
              name="selectedEvent"
              value={this.props.selectedEvent.id}
              onChange={e => this.props.selectedValueHandler(e.target.value)}
            >
              {selectOptions}
            </select>
          </p>
        </div>
      </div>
    );
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

export default GalleryHeader;
