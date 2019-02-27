import React, { useRef, useState, useContext } from 'react';
import './AuthPage.css';
import AuthContext from '../../context/authContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailEL = useRef(null);
  const passwordEL = useRef(null);
  const { login } = useContext(AuthContext);

  const switchModeHandler = () => setIsLogin((isLogin) => !isLogin);

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailEL.current.value;
    const password = passwordEL.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) return;

    console.log(email, password);
    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    if (!isLogin) {
      requestBody = {
        query: `
       mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
      `,
        variables: {
          email: email,
          password: password
        }
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login.token) {
          login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
        console.log('resData from auth', resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <h2>Logged in : {isLogin ? 'true' : 'false'}</h2>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailEL} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordEL} />
      </div>
      <div className="form-actions">
        <button type="button" onClick={switchModeHandler}>
          {/*Go to {!isLogin ? 'Register' : 'Login'}*/}
          Switch to {isLogin ? 'Signup' : 'Login'}
        </button>
          <button type="submit" >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AuthPage;
