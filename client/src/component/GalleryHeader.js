import React from "react";

const GalleryHeader = props => {
  const selectOptions = props.events.map((event, i) => (
    <option key={i} value={event.id}>
      {event.name}
    </option>
  ));

  const { name, hashtag } = props.selectedEvent;

  return (
    <React.Fragment>
      <div>
        <h1>{name}</h1>
        <h5>{hashtag}</h5>
      </div>
      <div>
        <select
          name="selectedEvent"
          value={props.selectedEvent.id}
          onChange={e => props.selectedValueHandler(e.target.value)}
        >
          {selectOptions}
        </select>
      </div>
    </React.Fragment>
  );
};

export default GalleryHeader;
