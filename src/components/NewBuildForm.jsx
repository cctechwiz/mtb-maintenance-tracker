import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const NewBuildForm = () => {
  const [ name, setName ] = useState('');

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userId)

  const handleNewBuild = async (e) => {
    e.preventDefault();

    const bodyObj = {
      buildName: name,
      userId: userId
    };

    const res = await axios.post('/api/new-build', bodyObj);

    if (res.data.success) {
      dispatch({
        type: 'UPDATE_BUILDS',
        payload: res.data.builds
      })
    }

    // console.log(res.data.message)
    // console.log(`BUILDS:`, res.data.builds)


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