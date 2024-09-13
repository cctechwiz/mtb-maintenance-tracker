import React, { useState } from 'react'
import axios from 'axios';

const NewBuildForm = () => {
  const [ name, setName ] = useState('');

  const handleNewBuild = async (e) => {
    e.preventDefault();

    const bodyObj = {
      name
    }

    const res = await axios.post('/api/new-build', bodyObj);
  }

  return (
    <form onSubmit={handleNewBuild}>
      <input
        value={name}
        type="text" 
        placeholder='Build name'
        onChange={(e) => setName(e.target.value)}
      />
      <input type="submit" />
    </form>
  )
}

export default NewBuildForm