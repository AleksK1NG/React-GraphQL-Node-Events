import React, { useState, useRef, useEffect, useContext } from 'react';
import './EventsPage.css';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';
import AuthContext from '../../context/authContext';
import EventList from '../../components/Events/EventList/EventList';
import Spinner from '../../components/Spinner/Spinner';

const EventsPage = (props) => {
  const [creating, setCreating] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { token, userId } = useContext(AuthContext);

  const titleElRef = useRef(null);
  const priceElRef = useRef(null);
  const dateElRef = useRef(null);
  const descriptionElRef = useRef(null);

  const startCreateEventHandler = () => setCreating(true);

  const modalConfirmHandler = () => {
    const title = titleElRef.current.value;
    const price = priceElRef.current.value;
    const date = dateElRef.current.value;
    const description = descriptionElRef.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const event = { title, price, date, description };

    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        console.log('resData fetch events', resData);
        const newEvent = {
          _id: resData.data.createEvent._id,
          title: resData.data.createEvent.title,
          description: resData.data.createEvent.description,
          date: resData.data.createEvent.date,
          price: resData.data.createEvent.price,
          creator: {
            _id: userId
          }
        };

        setEvents((events) => [...events, newEvent]);
        console.log('events from state => ', events);
        fetchEvents();
      })
      .catch((err) => {
        console.log(err);
      });

    setCreating(false);
  };

  const modalCancelHandler = () => setCreating(false);

  useEffect(() => {
    fetchEvents();
    console.log('events page ');
  }, []);

  const fetchEvents = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
          query {
            events {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        const events = resData.data.events;
        console.log('resData => events ', events);
        setEvents(events);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const showDetailHandler = (eventId) => {
    const selectedEv = events.find((e) => e._id === eventId);
    setSelectedEvent(selectedEv);
    console.log(selectedEv, eventId);
  };

  return (
    <React.Fragment>
      {creating && <Backdrop />}
      {creating && (
        <Modal
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
          title="Add Event"
          canCancel
          canConfirm
        >
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={titleElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={priceElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" ref={dateElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="4" ref={descriptionElRef} />
            </div>
          </form>
        </Modal>
      )}
      {token && (
        <div className="events-control">
          <p>Share your own Events!</p>
          <button className="btn" onClick={startCreateEventHandler}>
            Create Event
          </button>
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <EventList
          onViewDetail={showDetailHandler}
          authUserId={userId}
          events={events}
        />
      )}
    </React.Fragment>
  );
};

export default EventsPage;
