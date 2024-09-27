import React, { useState } from 'react'
import EditBuildSelect from './EditBuildSelect.jsx';
import axios from 'axios';

const EditPartForm = ({ partData, toViewMode, setParts }) => {
  const [ name, setName ] = useState(partData.name);
  const [ buildId, setBuildId ] = useState(partData.builds[0]?.id || false);
  const [ milesInt, setMilesInt ] = useState(partData.milesInt || '');
  const [ hoursInt, setHoursInt ] = useState(partData.hoursInt || '');
  const [ mfrPartNum, setMfrPartNum ] = useState(partData.mfrPartNum || '');
  const [ serialNum, setSerialNum ] = useState(partData.serialNum || '');
  const [ brand, setBrand ] = useState(partData.brand || '');
  const [ modelYear, setModelYear ] = useState(partData.modelYear || '');
  const [ notes, setNotes ] = useState(partData.notes || '');

  const handleEdit = async (e) => {
    e.preventDefault();

    if (name === '') {
      alert('Please fill out required fields.')
      return;
    };
    
    const bodyObj = {
      partId: partData.id,
      name,
      buildId,
      milesInt,
      hoursInt,
      mfrPartNum,
      serialNum,
      brand,
      modelYear,
      notes,
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
      {/* Part Name */}
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

      {/* Type Id */}
      <div>
        <EditBuildSelect buildId={buildId} setBuildId={setBuildId} />
      </div>
      
      {/* Miles Interval */}
      <div>
        <label htmlFor="edit-miles-int">Manufacturer Miles Service Interval:</label>
        <input 
          value={milesInt}
          id="edit-miles-int"
          type="number"
          placeholder='e.g. 200'
          onChange={(e) => setMilesInt(e.target.value)}
        />
      </div>

      {/* Hours Interval */}
      <div>
        <label htmlFor="edit-hours-int">Manufacturer Hours Service Interval:</label>
        <input 
          value={hoursInt}
          id="edit-hours-int"
          type="number"
          placeholder='e.g. 50'
          onChange={(e) => setHoursInt(e.target.value)}
        />
      </div>

      {/* Mfr partNumber */}
      <div>
        <label htmlFor="edit-mfr-part-num">Manufacturer Part Number:</label>
        <input
          id='edit-mfr-part-num'
          value={mfrPartNum}
          type="text"
          placeholder='e.g. XG-1295'
          onChange={(e) => setMfrPartNum(e.target.value)}
        />
      </div>

      {/* Serial Number */}
      <div>
        <label htmlFor="edit-serial-num">Serial Number:</label>
        <input
          id='edit-serial-num'
          value={serialNum}
          type="text"
          placeholder='Serial Number'
          onChange={(e) => setSerialNum(e.target.value)}
        />
      </div>

      {/* Brand */}
      <div>
        <label htmlFor="edit-brand">Brand Name:</label>
        <input
          id='edit-brand'
          value={brand}
          type="text"
          placeholder='e.g. Sram'
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      {/* Model Year */}
      <div>
        <label htmlFor="edit-model-year">Model Year:</label>
        <input
          id='edit-model-year'
          value={modelYear}
          type="number"
          placeholder='e.g. 2023'
          onChange={(e) => setModelYear(e.target.value)}
        />
      </div>

      {/* Notes */}
      <div>
          <label htmlFor="edit-notes">Part Notes/Details</label>
          <textarea
            id='edit-notes'
            value={notes}
            placeholder='Notes'
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

      <div>
        <input type="submit" />
      </div>

    </form>
  )
}

export default EditPartForm