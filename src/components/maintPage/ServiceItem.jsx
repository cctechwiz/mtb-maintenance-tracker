import React from 'react';

const ServiceItem = ({ data }) => {
  const formateDate = (date) => {
    const dateArr = date.split('-');
    dateArr[0] = dateArr[0].substring(2);
    const newDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
    return newDate;
  };

  const date = formateDate(data.date);

  return (
    <li>
      <div>
        Part: {data.part.name} | 
        Build: {data.part.builds[0]?.name || 'none'} | 
        Date: {date}
      </div>
      <div>
        {data.notes && <span>Notes: {data.notes}</span>}
      </div>
    </li>
  );
};

export default ServiceItem;