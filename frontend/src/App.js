import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
import BookingsPage from './pages/BookingsPage';
import EventsPage from './pages/EventsPage';
import MainNavBar from './components/Navbar/MainNavBar';

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavBar/>
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/bookings" component={BookingsPage} />
            <Route path="/events" component={EventsPage} />
          </Switch>
        </main>
      </React.Fragment>

    </BrowserRouter>
  );
};

export default App;
