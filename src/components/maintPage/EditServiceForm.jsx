import React, { useState } from 'react';
import EditPartSelect from './EditPartSelect.jsx';
import axios from 'axios';

const EditServiceForm = ({ toViewMode, data, setServices }) => {
  const [ partId, setPartId ] = useState(data.partId);
  const [ date, setDate ] = useState(data.date);
  const [ notes, setNotes ] = useState(data.notes || '');

  const handleEditService = async (e) => {
    e.preventDefault();

    if (partId === '' || date === '') {
      alert('Please fill out required fields.')
    };

    const bodyObj = {
      serviceId: data.id,
      partId,
      date,
      notes
    };

    const res = await axios.put('/api/edit-service', bodyObj);

    if (res.data.success) {
      toViewMode();

      const res = await axios.get('/api/maintenance');

      if (res.data.success) {
        setServices(res.data.maintData);
      };
    };
  };

  return (
    <form onSubmit={handleEditService}>
      {/* Part Select */}
      <EditPartSelect data={data} setPartId={setPartId} partId={partId} />

      {/* Date */}
      <div>
        <label htmlFor="edit-service-date">Date of Service:</label>
        <input
          value={date}
          type="date"
          name="edit-service-date"
          id="edit-service-date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="edit-notes">Service Notes:</label>
        <textarea 
          value={notes} 
          name="edit-notes"
          id="edit-notes" 
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div>
        <button type='button' onClick={toViewMode} >Cancel</button>
        <input type="submit" />
      </div>
    </form>
  );
};

export default EditServiceForm;