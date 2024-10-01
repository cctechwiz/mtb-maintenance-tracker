import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import NewServiceForm from "../components/maintPage/NewServiceForm.jsx";
import ServiceItem from "../components/maintPage/ServiceItem.jsx";

const Maintenance = () => {
  const [services, setServices] = useState(useLoaderData().maintData);
  const [displayForm, setDisplayForm] = useState(false);

  const serviceItems = services
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .map((service) => {
      return (
        <ServiceItem
          key={service.id}
          data={service}
          setServices={setServices}
        />
      );
    });

  return (
    <div className="page-container">
      <div className="title-container">
        <h1>Maintenance</h1>
        <button
          className='btn-primary'
          onClick={() => setDisplayForm(true)}
        >
          + Service
        </button>
      </div>

      {displayForm && (
        <NewServiceForm
          setDisplayForm={setDisplayForm}
          setServices={setServices}
        />
      )}

      <div>
        <ul>{serviceItems}</ul>
      </div>
    </div>
  );
};

export default Maintenance;
