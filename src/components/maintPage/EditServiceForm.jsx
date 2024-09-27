import React, { useState } from 'react';

const EditServiceForm = ({ toViewMode, data }) => {
  console.log('data to edit form:', data)
  const [ partId, setPartId ] = useState(data.partId);
  const [ date, setDate ] = useState(data.date);
  const [ notes, setNotes ] = useState(data.notes || '');

  console.log('date state:', date)

  return (
    <form >
      {/* Part Select */}

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