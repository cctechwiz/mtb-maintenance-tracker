import React, { useState } from 'react'
import BuildsSelect from './BuildsSelect.jsx';
import PartTypeSelect from './PartTypeSelect.jsx';
import axios from 'axios';
import { HiMiniXMark } from "react-icons/hi2";


const NewPartForm = ({ setParts, setDisplayForm }) => {
  const [ name, setName ] = useState('');
  const [ buildId, setBuildId ] = useState('');
  const [ typeId, setTypeId ] = useState('');
  const [ brand, setBrand ] = useState('');
  const [ partNum, setPartNum ] = useState('');
  const [ serialNum, setSerialNum ] = useState('');
  const [ estHours, setEstHours ] = useState('');
  const [ estMiles, setEstMiles ] = useState('');
  const [ hoursInt, setHoursInt ] = useState('');
  const [ milesInt, setMilesInt ] = useState('');
  const [ modelYear, setModelYear ] = useState('');
  const [ notes, setNotes ] = useState('');

  // TODO: prevent user from adding a part to build if build already has part in selected partType (add functionality to swap the part???)

  const handleNewPart = async (e) => {
    e.preventDefault();

    const bodyObj = {
      name,
      buildId,
      typeId,
      brand,
      partNum,
      serialNum,
      estHours,
      estMiles,
      hoursInt,
      milesInt,
      modelYear,
      notes
    };

    if (name === '' || buildId === '' || typeId === '') {
      alert('Please fill out required fields');
      return;
    }

    const res = await axios.post('/api/new-part', bodyObj);

    console.log('new-part axios response:', res.data)
    if (res.data.success) {
      setName('');
      setBuildId('');
      setTypeId('');
      setBrand('');
      setPartNum('');
      setSerialNum('');
      setEstHours('');
      setEstMiles('');
      setHoursInt('');
      setMilesInt('');
      setModelYear('');
      setNotes('');
      
      setDisplayForm(false);
      
      const res = await axios.get('/api/parts');
      
      if (res.data.success) {
        setParts(res.data.partsData)
      };
    };

  };

  return (
    <>
      <div className='overlay' />
      <div className="modal">
        <div className="modal-x-container">
          <button type="button" onClick={() => setDisplayForm(false)}>
            <HiMiniXMark className='modal-x-icon' />
          </button>
        </div>
        <div className="modal-title-container">
          <h2>Create New Part</h2>
        </div>
        <form className='modal-form' onSubmit={handleNewPart}>
          <div className='input-container'>
            <label className='input-label' htmlFor="name">Part Name<sup>*</sup>:</label>
            <input
              className='input-field'
              id='name'
              value={name}
              type="text"
              placeholder='e.g. Cassette - X01 Eagle 12 speed'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Build */}
          <div className='select-container'>
            <BuildsSelect setBuildId={setBuildId} />
          </div>

          {/* Part type */}
          <div className='select-container'>
            <PartTypeSelect setTypeId={setTypeId} typeId={typeId} />
          </div>

          {/* Brand */}
          <div className='input-container'>
            <label className='input-label' htmlFor="brand">Brand Name:</label>
            <input
              className='input-field'
              id='brand'
              value={brand}
              type="text"
              placeholder='e.g. Sram'
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          {/* Manufacturer Part number */}
          <div className='input-container'>
            <label className='input-label' htmlFor="part-num">Manufacturer Part Number:</label>
            <input
              className='input-field'
              id='part-num'
              value={partNum}
              type="text"
              placeholder='e.g. XG-1295'
              onChange={(e) => setPartNum(e.target.value)}
            />
          </div> 

          {/* Serial Number */}
          <div className='input-container'>
            <label className='input-label' htmlFor="serial-num">Serial Number:</label>
            <input
              className='input-field'
              id='serial-num'
              value={serialNum}
              type="text"
              placeholder='Serial Number'
              onChange={(e) => setSerialNum(e.target.value)}
            />
          </div>

          {/* Model Year */}
          <div className='input-container'>
            <label className='input-label' htmlFor="model-year">Model Year:</label>
            <input
              className='input-field'
              id='model-year'
              value={modelYear}
              type="text"
              placeholder='e.g. 2023'
              onChange={(e) => setModelYear(e.target.value)}
            />
          </div>

          {/* Time/Distance on already on part */}
          {/* <div>
            <div>
              <span>Have you used this part already (optional)?</span>
            </div>
            <div>
              <label htmlFor="est-hours">Estimated Time Since Last Service (in hours)</label>
              <input
                id='est-hours'
                value={estHours}
                type="number"
                placeholder='e.g. 8'
                onChange={(e) => setEstHours(e.target.value)}
                />
            </div>
            <div>
              <label htmlFor="est-miles">Estimated Distance Since Last Service (in miles. prefer Km?)</label>
              <input
                id='est-miles'
                value={estMiles}
                type="number"
                placeholder='e.g. 12.5'
                onChange={(e) => setEstMiles(e.target.value)}
              />
            </div>
          </div> */}
          
          {/* Manufacturer's recommended service interval */}
          {/* <div>
            <div>
              <span>Do you know the recommended manufacturer's recommended service interval (optional)?</span>
            </div>
            <div>
              <label htmlFor="time-interval">Service interval in hours</label>
              <input
                id='time-interval'
                value={hoursInt}
                type="number"
                placeholder='e.g. 50'
                onChange={(e) => setHoursInt(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="miles-int">Service interval in miles</label>
              <input
                id='miles-int'
                value={milesInt}
                type="number"
                placeholder='e.g. 200'
                onChange={(e) => setMilesInt(e.target.value)}
              />
            </div>
          </div> */}

          {/* Notes */}
          <div className='text-area-container'>
            <label className='text-area-label' htmlFor="notes">Part Notes/Details:</label>
            <textarea
              className='text-area-field'
              id='notes'
              value={notes}
              placeholder='Notes or details about this part you may want to remember later'
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <div className='modal-bottom-btns-container'>
            <button
              className='btn-cancel'
              type="button"
              onClick={() => setDisplayForm(false)}
            >
              Cancel
            </button>
            <button className='btn-submit' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewPartForm