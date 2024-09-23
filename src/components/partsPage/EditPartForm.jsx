import React, { useState } from 'react'
import EditBuildSelect from './EditBuildSelect.jsx';
import axios from 'axios';

const EditPartForm = ({ partData, toViewMode, setParts }) => {
  const [ name, setName ] = useState(partData.name);
  const [ buildId, setBuildId ] = useState(partData.builds[0]?.id || false);

  const handleEdit = async (e) => {
    e.preventDefault();
    
    const bodyObj = {
      partId: partData.id,
      name,

    };

    const res = await axios.put('/api/edit-part', bodyObj);

    if (res.data.success) {
      setName('');
      toViewMode();

      const res = await axios.get('/api/parts');

      if (res.data.success) {
        setParts(res.data.partsData);
      };
    }
  };

  return (
    <form onSubmit={(e) => handleEdit(e)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input 
          value={name}
          type="text"
          placeholder='Part name'
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <EditBuildSelect buildId={buildId} setBuildId={setBuildId} />
      </div>
      
      <div>
        {/* <label htmlFor="name">Name:</label>
        <input 
          value={name}
          type="text"
          placeholder='Part name'
          onChange={(e) => setName(e.target.value)}
        /> */}
      </div>

      <div>
        <input type="submit" />
      </div>

    </form>
  )
}

export default EditPartForm