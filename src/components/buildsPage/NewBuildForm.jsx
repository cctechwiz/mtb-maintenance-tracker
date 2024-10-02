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
      <div id="overlay" className='overlay' />
      <div id="modal" className='modal'>
        <div className='modal-x-container'>
          <button type="button" onClick={() => setDisplayForm(false)}>
            <HiMiniXMark className='modal-x-icon' />
          </button>
        </div>
        <div className="modal-title-container">
          <h2>Create New Build</h2>
        </div>
        <form onSubmit={handleNewBuild} className='modal-form'>
          <div className='input-container'>
            <label className='input-label' htmlFor="build-name">Build Name<sup>*</sup>:</label>
            <input
              className='input-field'
              value={name}
              id='build-name'
              type="text" 
              placeholder='e.g. "Downhill" or "Trek Slash"'
              onChange={(e) => setName(e.target.value)}
              />
          </div>

          <div className='checkbox-container'>
            <label 
              className='checkbox-label'
              htmlFor="create-new-parts"
            >
              Create new parts for this build?
            </label>
            <input
              className='checkbox'
              value={newPartsSelected}
              type="checkbox"
              checked={newPartsSelected}
              id="create-new-parts"
              onChange={handleNewPartsChange}
            />
          </div>

          <div className='modal-bottom-btns-container'>
            <button
              className='btn-cancel'
              type="button"
              onClick={() => setDisplayForm(false)}
            >
              Cancel
            </button>
            <button
              className='btn-submit'
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewBuildForm