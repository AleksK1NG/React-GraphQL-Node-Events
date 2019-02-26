import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
import BookingsPage from './pages/Bookings/BookingsPage';
import EventsPage from './pages/Events/EventsPage';
import MainNavBar from './components/Navbar/MainNavBar';
import AuthContext from './context/authContext';

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };

  const logOut = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider
          value={{
            token,
            userId,
            login,
            logOut
          }}
        >
          <MainNavBar />
          <main className="main-content">
            <Switch>
              {token && <Redirect from="/" to="/events" exact />}
              {token && <Redirect from="/auth" to="/events" exact />}
              {!token && <Route path="/auth" component={AuthPage} />}
              <Route path="/events" component={EventsPage} />
              {token && <Route path="/bookings" component={BookingsPage} />}
              {!token && <Redirect to="/auth" exact />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
