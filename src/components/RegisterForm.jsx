import React, { useState } from 'react'

const RegisterForm = ({ setShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <>
      <div>
        <h1>Register</h1>
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

        <div>
          <input
            value={name}
            type="text"
            id="name"
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
          />
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