import React, { useState } from 'react';
import './AuthPage.css';

const AuthPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <form className="auth-form">
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="email" />
      </div>
      <div className="form-actions">
        <button type="button">Sign UP</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AuthPage;
