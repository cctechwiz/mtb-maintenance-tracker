import React, { useState } from 'react'

const NewPartForm = () => {
  const [ name, setName ] = useState('');
  const [ build, setBuild ] = useState('');
  const [ partType, setPartType ] = useState('');
  const [ brand, setBrand ] = useState('');
  const [ partNum, setPartNum ] = useState('');
  const [ serialNum, setSerialNum ] = useState('');
  const [ estHours, setEstHours ] = useState('');
  const [ estMiles, setEstMiles ] = useState('');
  const [ hoursInt, setHoursInt ] = useState('');
  const [ milesInt, setMilesInt ] = useState('');
  const [ notes, setNotes ] = useState('');

  // console.log(`name:`, name);
  // console.log(`brand:`, brand);

  // TODO: prevent user from adding a part to build if build already has part in selected partType (add functionality to swap the part???)

  return (
    <>
      <h3>Create New Part</h3>
      <form>
        <div>
          <label htmlFor="name">Part Name</label>
          <input
            id='name'
            value={name}
            type="text"
            placeholder='e.g. Cassette'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Which build is it installed on? */}

        {/* Part type drop down (should there be a part category drop down first???) */}
        {/* <div>
          <option value=""></option>
        </div> */}

        {/* Brand */}
        <div>
          <label htmlFor="brand">Brand Name</label>
          <input
            id='brand'
            value={brand}
            type="text"
            placeholder='e.g. Sram'
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        {/* Manufacturer Part number */}
        <div>
          <label htmlFor="part-num">Manufacturer Part Number</label>
          <input
            id='part-num'
            value={partNum}
            type="text"
            placeholder='Mfr Part Number'
            onChange={(e) => setPartNum(e.target.value)}
          />
        </div> 

        {/* Serial Number */}
        <div>
          <label htmlFor="serial-num">Serial Number</label>
          <input
            id='serial-num'
            value={serialNum}
            type="text"
            placeholder='Serial Number'
            onChange={(e) => setSerialNum(e.target.value)}
          />
        </div>

        {/* Time/Distance on already on part */}
        <div>
          <div>
            <span>Have you used this part already?</span>
          </div>
          <div>
            <label htmlFor="est-hours">Estimated Time Since Last Service (in hours)</label>
            <input
              id='est-hours'
              value={estHours}
              type="text"
              placeholder='e.g. 8'
              onChange={(e) => setEstHours(e.target.value)}
              />
          </div>
          <div>
            <label htmlFor="est-miles">Estimated Distance Since Last Service (in miles. prefer Km?)</label>
              {/* TODO: Prefers Km? switch here */}
            <input
              id='est-miles'
              value={estMiles}
              type="text"
              placeholder='e.g. 12.5'
              onChange={(e) => setEstMiles(e.target.value)}
            />
          </div>
        </div>
        
        {/* Manufacturer's recommended service interval */}
        <div>
          <div>
            <span>Do you know the recommended manufacturer's recommended service interval?</span>
          </div>
          <div>
            <label htmlFor="time-interval">Service interval in hours</label>
            <input
              id='time-interval'
              value={hoursInt}
              type="text"
              placeholder='e.g. 50'
              onChange={(e) => setHoursInt(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="miles-int">Service interval in miles</label>
            <input
              id='miles-int'
              value={milesInt}
              type="text"
              placeholder='e.g. 200'
              onChange={(e) => setMilesInt(e.target.value)}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes">Notes regarding this part</label>
          <textarea
            id='notes'
            value={notes}
            placeholder='Notes'
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  )
}

export default NewPartForm