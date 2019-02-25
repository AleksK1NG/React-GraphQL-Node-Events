import React, { useState, useRef, useEffect } from 'react';
import './EventsPage.css';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';

const EventsPage = (props) => {
  const [creating, setCreating] = useState(false);
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
    console.log('event from confirm =>', event);

    setCreating(false);
  };
  const modalCancelHandler = () => setCreating(false);

  useEffect(() => {
    console.log('events page ');
  }, []);

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
      <h2>Events page</h2>
      <div className="events-control">
        <p>Share your own Events!</p>
        <button className="btn" onClick={startCreateEventHandler}>
          Create Event
        </button>
      </div>
    </React.Fragment>
  );
};

export default EventsPage;