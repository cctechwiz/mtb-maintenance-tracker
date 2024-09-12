import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ setShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const bodyObj = {
      email,
      password,
      name,
    };

    // Make API call to register new user to db
    const res = await axios.post('/api/register', bodyObj);

    if (res.data.success) {
      dispatch({
        type: 'USER_AUTH',
        payload: res.data.userId
      });

      // clears input fields
      setEmail('');
      setPassword('');
      setName('');

      navigate('/')
    } else {
      // TODO: change to toastify
      setErrorMessage(res.data.message);
    };
  }

  return (
    <>
      <div>
        <h1>Register</h1>
      </div>

      <div>
        {/* TODO: change to toastify */}
        {errorMessage &&
          <p>{errorMessage}</p>
        }
      </div>
      
      <form onSubmit={handleRegister}>
        <div>
          <input
            value={email}
            type="email"
            id='email'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            value={name}
            type="text"
            id="name"
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            value={password}
            type="password"
            id='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>

      <div>
        <span>Already a user?</span>
        {/* QUESTION: Should I use a React state or Redux state determine showRegister??? */}
        <button onClick={() => setShowRegister(false)}>Login Here</button> 
      </div>
    </>
  )
}

export default RegisterForm