import React, { useState } from 'react';
import PartSelect from './PartSelect';
import axios from 'axios';
import { HiMiniXMark } from "react-icons/hi2";

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
      <div className='overlay' />
      <div className='modal'>
        <div className='modal-x-container'>
          <button type="button" onClick={() => setDisplayForm(false)}>
            <HiMiniXMark className='modal-x-icon' />
          </button>
        </div>
        <div className="modal-title-container">
          <h2>Add a Service</h2>
        </div>
        <form onSubmit={handleNewService} className='modal-form'>
          {/* Part Picker */}
          <PartSelect partId={partId} setPartId={setPartId} />

          {/* Date */}
          <div className='date-container'>
            <label className='date-label' htmlFor="service-date">Date of Service:</label>
            <div>
              <input
                className='date'
                value={date}
                id="service-date"
                type="date"
                name="service-date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Notes */}
          <div className='text-area-container'>
            <label className='text-area-label' htmlFor="service-notes">Service Notes:</label>
            <textarea
              className='text-area-field'
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

          <div className='modal-bottom-btns-container'>
            <button
              className='btn-cancel'
              type='button'
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
  );
};

export default NewServiceForm;