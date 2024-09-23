import React, { useState } from 'react'
import EditBuildSelect from './EditBuildSelect.jsx';
import axios from 'axios';

const EditPartForm = ({ partData, toViewMode, setParts }) => {
  const [ name, setName ] = useState(partData.name);
  const [ buildId, setBuildId ] = useState(partData.builds[0]?.id || false);
  const [ milesInt, setMilesInt ] = useState(partData.milesInt || '');

  const handleEdit = async (e) => {
    e.preventDefault();
    
    const bodyObj = {
      partId: partData.id,
      name,
      buildId,
      milesInt,

    };

    const res = await axios.put('/api/edit-part', bodyObj);

    console.log('res.data:', res.data)

    if (res.data.success) {
      setName('');
      toViewMode();

      const res = await axios.get('/api/parts');

      if (res.data.success) {
        setParts(res.data.partsData);
      };
    }
  };

  console.log('partData:', partData)

  return (
    <form onSubmit={(e) => handleEdit(e)}>
      <div>
        <label htmlFor="edit-name">Name:</label>
        <input
          id='edit-name'
          value={name}
          type="text"
          placeholder='Part name'
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <EditBuildSelect buildId={buildId} setBuildId={setBuildId} />
      </div>

      {/* Type Id */}
      
      {/* Miles Interval */}
      <div>
        <label htmlFor="edit-miles-int">Manufacturer Hours Service Interval:</label>
        <input 
          value={milesInt}
          id="edit-miles-int"
          type="number"
          placeholder='e.g. 200'
          onChange={(e) => setMilesInt(e.target.value)}
        />
      </div>

      {/* Hours Interval */}

      {/* Mfr partNumber */}

      {/* Serial Number */}

      {/* Brand */}

      {/* Model Year */}

      {/* Notes */}

      <div>
        <input type="submit" />
      </div>

    </form>
  )
}

export default EditPartForm