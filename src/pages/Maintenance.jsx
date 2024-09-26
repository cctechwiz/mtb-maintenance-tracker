import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import NewServiceForm from '../components/maintPage/NewServiceForm.jsx';
import ServiceItem from '../components/maintPage/ServiceItem.jsx';

const Maintenance = () => {
  const [ services, setServices ] = useState(useLoaderData().maintData);
  const [ displayForm, setDisplayForm ] = useState(false);

  console.log('services data:', services);

  const serviceItems = services.map((service) => {
    return (
      <ServiceItem
        key={service.id}
        data={service}
      />
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

      <div>
        <ul>
          { serviceItems }
        </ul>
      </div>
    </>
  );
};

export default Maintenance;
