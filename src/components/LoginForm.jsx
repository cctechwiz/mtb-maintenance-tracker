import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userId)

  const handleLogin = async (e) => {
    e.preventDefault();

    const bodyObj = {
      email: email,
      password: password
    };

    const res = await axios.post("/api/login", bodyObj);

    if (res.data.success) {
      // saves userId to redux
      dispatch({
        type: 'USER_AUTH',
        payload: res.data.userId
      })

      // clears input fields
      setEmail('');
      setPassword('');
      
      // navigates to index (dashboard)
      navigate('/');
    };
  };

  return (
    <>
      <div>
        <h1>Login</h1>
      </div>
      
      <form onSubmit={handleLogin}>
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
        <span>New user?</span>
        <button onClick={() => setShowRegister(true)}>Register Here</button> 
      </div>
    </>
  )
}

export default LoginForm