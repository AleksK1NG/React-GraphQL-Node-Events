import React, { useState } from 'react';
import './EventsPage.css';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';

const EventsPage = (props) => {
  const [creating, setCreating] = useState(false);

  const startCreateEventHandler = () => setCreating(true);
  const modalConfirmHandler = () => setCreating(false);
  const modalCancelHandler = () => setCreating(false);

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
          <p>Modal content</p>
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
