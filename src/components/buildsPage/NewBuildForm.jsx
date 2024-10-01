import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { HiMiniXMark } from "react-icons/hi2";


const NewBuildForm = ({ setUserBuilds, setDisplayForm }) => {
  const [ name, setName ] = useState('');
  const [ newPartsSelected, setNewPartsSelected ] = useState(true);

  const userId = useSelector((state) => state.userId)

  const handleNewBuild = async (e) => {
    e.preventDefault();

    const bodyObj = {
      buildName: name,
      userId: userId,
      createNewParts: newPartsSelected
    };

    const res = await axios.post('/api/new-build', bodyObj);

    if (res.data.success) {
      setName('');
      setDisplayForm(false);
      
      // setUserBuilds(res.data.builds);
      const res = await axios.get('/api/builds');

      if (res.data.success) {
        setUserBuilds(res.data.userBuilds)
      };
    }
  };

  const handleNewPartsChange = () => {
    setNewPartsSelected(!newPartsSelected)
  }

  return (
    <>
      <div id="overlay" className='fixed top-0 left-0 right-0 bottom-0 bg-black/60 bg-transparent-70'></div>
      <div id="modal" className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 z-1000 rounded-lg w-[95%] max-w-md md:max-w-lg lg:max-w-xl'>
        <div className='flex justify-end items-start'>
          <button type="button" onClick={() => setDisplayForm(false)}>
            <HiMiniXMark className='h-6 w-6' />
          </button>
        </div>
        <h3 className='text-2xl mb-5 mx-3'>Create New Build</h3>
        <form onSubmit={handleNewBuild} className='flex flex-col gap-4 mb-3 mx-3'>
          <div className='flex flex-col'>
            <label className='text-sm' htmlFor="build-name">Build Name<sup>*</sup>:</label>
            <input
              className='border-2 border-blue-medium rounded-md p-1'
              value={name}
              id='build-name'
              type="text" 
              placeholder='e.g. "Downhill" or "Trek Slash"'
              onChange={(e) => setName(e.target.value)}
              />
          </div>

          <div className='flex items-center gap-3'>
            <label htmlFor="create-new-parts">Create new parts for this build?</label>
            <input
              className='h-5 w-5'
              value={newPartsSelected}
              type="checkbox"
              checked={newPartsSelected}
              id="create-new-parts"
              onChange={handleNewPartsChange}
            />
          </div>

          <div>
            <button className='text-xl text-white bg-blue-light rounded-md px-4 py-1' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewBuildForm