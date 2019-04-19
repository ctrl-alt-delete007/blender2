import React, { Component } from "react";

class GalleryHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      q: ""
    };
  }

  render() {
    const selectOptions = this.props.events.map((event, i) => (
      <option key={i} value={event.id}>
        {event.name}
      </option>
    ));

    const { name, hashtag, posts, users } = this.props.selectedEvent;

    return (
      <React.Fragment>
        <div>
          <h1>{name}</h1>
          <h5>#{hashtag}</h5>
          <p>
            {posts} Posts // {users} Users
          </p>
        </div>
        <div>
          <select
            name="selectedEvent"
            value={this.props.selectedEvent.id}
            onChange={e => this.props.selectedValueHandler(e.target.value)}
          >
            {selectOptions}
          </select>
        </div>
        <div>
          <p>
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
          </p>
        </div>
        <div />
      </React.Fragment>
    );
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

export default GalleryHeader;
