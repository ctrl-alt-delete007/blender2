import React, { Component } from "react";

class GalleryHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      q: "",
      events: this.props.events || [],
      selectedEvent: this.props.selectedEvent || {}
    };
  }

  componentDidMount() {
    if (
      this.props.selectedEvent === undefined &&
      this.props.events.length === 0
    ) {
      fetch("/api/events")
        .then(res => res.json())
        .then(events => {
          this.setState({ events, selectedEvent: events[0] });
        });
    }
  }

  render() {
    const events = this.state.events;
    const selectOptions = events.map((event, i) => (
      <option key={i} value={event.id}>
        {event.name}
      </option>
    ));

    console.log(this.state.selectedEvent);

    return (
      <div id="gallery-header-container">
        <div className="gallery-header-child">
          <h1>{this.props.selectedEvent.event.name}</h1>
        </div>

        <div id="gallery-header-child-regular" className="gallery-header-child">
          <div className="gallery-hc-node">
            <p>
              <span id="header-hashtag">
                #{this.props.selectedEvent.event.hashtag}{" "}
              </span>
              <span id="header-postuser-container">
                <span className="header-posts-users">
                  {this.props.selectedEvent.event.posts}
                </span>{" "}
                Posts //{" "}
                <span className="header-posts-users">
                  {this.props.selectedEvent.event.users}
                </span>{" "}
                Users
              </span>
            </p>
          </div>
          <div id="gallery-hc-node2" className="gallery-hc-node">
            <label id="select-event-dropdown-label" htmlFor="selectedEvent">
              Event Name
            </label>
            <select
              id="select-event-dropdown"
              name="selectedEvent"
              value={this.props.selectedEvent.event.id}
              onChange={e => this.selectHandler(parseInt(e.target.value))}
            >
              {selectOptions}
            </select>
          </div>
          <div id="gallery-hc-node3" className="gallery-hc-node">
            <div>
              <input
                type="text"
                name="q"
                id="q"
                value={this.state.q}
                onChange={this.changeHandler}
                placeholder="search for user"
              />
            </div>
            <div>
              <button
                className="compact ui black button"
                onClick={() => this.props.searchHandler(this.state.q)}
              >
                search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectHandler = id => {
    this.props.selectedValueHandler(id);
  };
}

export default GalleryHeader;
