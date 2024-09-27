import React, { useState } from 'react';
import { useActionData } from 'react-router-dom';
import EditServiceForm from './EditServiceForm.jsx';

const ServiceItem = ({ data, setServices }) => {
  const [ editMode, setEditMode ] = useState(false);

  const toEditMode = () => {
    setEditMode(true);
  };

  const toViewMode = () => {
    setEditMode(false)
  };

  const formateDate = (date) => {
    const dateArr = date.split('-');
    dateArr[0] = dateArr[0].substring(2);
    const newDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
    return newDate;
  };

  const date = formateDate(data.date);

  return !editMode ? (
    <li>
      <div>
        Part: {data.part.name} | 
        Build: {data.part.builds[0]?.name || 'none'} | 
        Date: {date}
        <button onClick={toEditMode}>Edit</button>
        <button>Delete</button>
      </div>
      <div>
        {data.notes && <span>Notes: {data.notes}</span>}
      </div>
    </li>
  ) : (
    <li>
      <div>
        <EditServiceForm toViewMode={toViewMode} data={data} setServices={setServices} />
      </div>
    </li>
  )
};

export default ServiceItem;