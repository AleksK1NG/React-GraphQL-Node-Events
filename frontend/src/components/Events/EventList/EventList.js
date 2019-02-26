import React from 'react';
import './EventList.css';
import EventItem from '../EventItem/EventItem';

const EventList = ({ events, authUserId, onViewDetail }) => {
  events = events.map((event) => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        price={event.price}
        date={event.date}
        userId={authUserId}
        creatorId={event.creator._id}
        onDetail={onViewDetail}
      />
    );
  });

  return <ul className="event__list">{events}</ul>;
};
export default EventList;


