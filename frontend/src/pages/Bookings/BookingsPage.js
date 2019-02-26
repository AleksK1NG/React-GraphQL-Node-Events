import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/authContext';
import Spinner from '../../components/Spinner/Spinner';

const BookingsPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const { token, userId } = useContext(AuthContext);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
          query {
            bookings {
              _id
             createdAt
             event {
               _id
               title
               date
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
        const bookings = resData.data.bookings;
        console.log('bookings from Bookings => ', bookings);
        setBookings(bookings);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              {booking.event.title} -{' '}
              {new Date(booking.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default BookingsPage;
