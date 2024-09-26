import React, { useState } from 'react';
import PartSelect from './PartSelect';

const NewServiceForm = () => {
  const [ partId, setPartId ] = useState('');
  const [ date, setDate ] = useState('');
  const [ notes, setNotes ] = useState('');

  const handleNewService = async (e) => {
    e.preventDefault();

    // TODO: ensure required fields are filled out
  }

  return (
    <>
      <h3>Add a Service</h3>
      <form >
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

        {/* Part Picker */}
        <PartSelect partId={partId} setPartId={setPartId} />

        {/* Reset service interval? (Not necessary until rides are incorporated) */}
        {/* <div>
          <label htmlFor="reset-interval">Reset Service Interval on Part?</label>
        </div> */}
      </form>
    </>
  );
};

export default NewServiceForm;