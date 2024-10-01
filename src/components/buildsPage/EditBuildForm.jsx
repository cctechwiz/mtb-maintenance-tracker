import axios from 'axios';;
import React, { useState } from 'react';

const EditBuildForm = ({ data, setUserBuilds, toViewMode }) => {
  const [ name, setName ] = useState(data.name);

  const handleEditBuild = async (e) => {
    e.preventDefault();

    const bodyObj = {
      buildId: data.id,
      name,
    };

    const res = await axios.put('/api/edit-build', bodyObj);

    if (res.data.success) {
      const res = await axios.get('/api/builds');

      if (res.data.success) {
        toViewMode();
        setUserBuilds(res.data.userBuilds);
      };
    };
  };

  return (
    <form onSubmit={handleEditBuild} className='flex flex-col gap-4 mb-3 mx-3'>
      <div id='edit-build-name-container' className='flex flex-col'>
        <label htmlFor="edit-build-name">Build Name:</label>
        <input
          className='border-2 border-blue-medium rounded-md p-1'
          value={name}
          id='edit-build-name'
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div id='button-container' className='flex justify-between mt-2'>
        <button 
          className='text-gray-400 bg-white border-2 border-gray-400 rounded-md px-4 py-1'
          type='button'
          onClick={toViewMode}
        >
          Cancel
        </button>
        <button 
          className='text-xl text-white bg-blue-light border-2 border-blue-light rounded-md px-4 py-1'
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditBuildForm;