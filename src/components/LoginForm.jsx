import React, { useState } from 'react'

const LoginForm = ({ setShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div>
        <h1>Login</h1>
      </div>
      
      <form>
        <div>
          {/* <label htmlFor="email">Email:</label> */}
          <input
            value={email}
            type="email"
            id='email'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          {/* <label htmlFor='password'>Password:</label> */}
          <input
            value={password}
            type="password"
            id='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>

      <div>
        <span>New user?</span>
        {/* QUESTION: Should I use a React state or Redux state determine showRegister??? */}
        <button onClick={() => setShowRegister(true)}>Register Here</button> 
      </div>
    </>
  )
}

export default LoginForm