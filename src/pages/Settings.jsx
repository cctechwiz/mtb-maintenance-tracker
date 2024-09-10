import React from 'react'

const Settings = () => {
  return (
    <>
      <h1>Settings</h1>
      <div>
        <p>Email: user1@test.com <button>Edit Email</button></p>
        <button>Change Password</button>
      </div>
      <label>Preferred unit of measure</label>
      <div>
        <input type="radio" name="miles" id="" />
        <span>Miles</span>
      </div>
      <div>
        <input type="radio" name="kilometers" id="" />
        <span>Kilometers</span>
      </div>
    </>
  )
}

export default Settings