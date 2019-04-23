import React from "react";

const GalleryHeader = props => {
  const events = props.events;
  const selectOptions = events.map((event, i) => (
    <option key={i} value={event.id}>
      {event.name}
    </option>
  ));

  console.log(props, props.selectedEvent, Object.keys(props.selectedEvent));

  let name, hashtag, posts, users, id;

  if (Object.keys(props.selectedEvent).length > 3) {
    name = props.selectedEvent.event.name;
    hashtag = props.selectedEvent.event.hashtag;
    posts = props.selectedEvent.event.posts;
    users = props.selectedEvent.event.users;
    id = props.selectedEvent.event.id;
  } else {
    name = props.selectedEvent.name;
    hashtag = props.selectedEvent.hashtag;
    posts = props.selectedEvent.posts;
    users = props.selectedEvent.users;
    id = props.selectedEvent.id;
  }
  return (
    <div id="gallery-header-container">
      <div className="gallery-header-child">
        <h1>{name}</h1>
      </div>

      <div id="gallery-header-child-regular" className="gallery-header-child">
        <div className="gallery-hc-node">
          <p>
            <span id="header-hashtag">#{hashtag} </span>
            <span id="header-postuser-container">
              <span className="header-posts-users">{posts}</span> Posts //{" "}
              <span className="header-posts-users">{users}</span> Users
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
            value={id}
            onChange={e => props.selectedValueHandler(parseInt(e.target.value))}
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
              value={props.q}
              onChange={e => props.changeHandler(e.target.value)}
              placeholder="search for user"
            />
          </div>
          <div>
            <button
              className="compact ui black button"
              onClick={props.searchHandler}
            >
              search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryHeader;
