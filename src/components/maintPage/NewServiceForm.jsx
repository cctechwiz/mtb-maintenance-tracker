import React, { useState } from 'react';
import PartSelect from './PartSelect';
import axios from 'axios';

const NewServiceForm = ({ setDisplayForm, setServices }) => {
  const [ partId, setPartId ] = useState('');
  const [ date, setDate ] = useState('');
  const [ notes, setNotes ] = useState('');

  const handleNewService = async (e) => {
    e.preventDefault();

    if (!partId || !date) {
      alert('Please fill out required fields.');
      return;
    };

    const bodyObj = {
      partId,
      date,
      notes
    };

    const res = await axios.post('/api/new-service', bodyObj);

    if (res.data.success) {
      setDisplayForm(false);

      const res = await axios.get('/api/maintenance');

      if (res.data.success) {
        setServices(res.data.maintData);
      };
    };
  };

  return (
    <>
      <h3>Add a Service</h3>
      <form onSubmit={handleNewService} >
        {/* Part Picker */}
        <PartSelect partId={partId} setPartId={setPartId} />

        {/* Date */}
        <div>
          <label htmlFor="service-date">Date of Service:</label>
          <input
            value={date}
            id="service-date"
            type="date"
            name="service-date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="service-notes">Service Notes:</label>
          <textarea
            value={notes}
            name="service-notes" 
            id="serviceNotes"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        {/* Reset service interval? (Not necessary until rides are incorporated) */}
        {/* <div>
          <label htmlFor="reset-interval">Reset Service Interval on Part?</label>
        </div> */}

        <div>
          <input type="submit"/>
        </div>
      </form>
    </>
  );
};

export default NewServiceForm;