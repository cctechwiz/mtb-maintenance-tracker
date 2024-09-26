import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import NewServiceForm from '../components/maintPage/NewServiceForm.jsx';

const Maintenance = () => {
  const [ services, setServices ] = useState(useLoaderData().maintData);
  const [ displayForm, setDisplayForm ] = useState(false);

  console.log('services data:', services);

  const serviceItems = services.map((service) => {
    const formateDate = (date) => {
      const dateArr = date.split('-');
      dateArr[0] = dateArr[0].substring(2);
      const newDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
      return newDate;
    }

    const date = formateDate(service.date);



    return (
      <li key={service.id}>
        <div>
          Part: {service.part.name} | 
          Build: {service.part.builds[0]?.name || 'none'} | 
          Date: {date}
        </div>
        <div>
          {service.notes && <span>Notes: {service.notes}</span>}
        </div>
      </li>
    );
  });

  return (
    <>
      <div>
        <h1>Maintenance</h1>
        {!displayForm && <button onClick={() => setDisplayForm(true)}>Add Service</button>}
        {displayForm && <NewServiceForm />}
        {displayForm && <button onClick={() => setDisplayForm(false)}>Cancel</button>}
      </div>

      {/* Service items */}
      <div>
        <ul>
          { serviceItems }
        </ul>
      </div>
    </>
  );
};

export default Maintenance;
