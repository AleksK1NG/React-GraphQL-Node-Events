import React, { useRef } from 'react';
import './AuthPage.css';

const AuthPage = (props) => {
  const emailEL = useRef(null);
  const passwordEL = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailEL.current.value;
    const password = passwordEL.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) return;

    console.log(email, password);
  };

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailEL} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="email" ref={passwordEL} />
      </div>
      <div className="form-actions">
        <button type="button">Sign UP</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AuthPage;
