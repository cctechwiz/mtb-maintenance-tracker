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
    <form onSubmit={handleEditBuild}>
      <div>
        <label htmlFor="edit-build-name">Build Name:</label>
        <input
          value={name}
          id='edit-build-name'
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};

export default EditBuildForm;