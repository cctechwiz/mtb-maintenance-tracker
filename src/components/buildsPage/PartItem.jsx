import React from 'react';

const PartItem = ({ data, setUserBuilds }) => {
  return (
    <li>{ data.name }</li>
  );
};

export default PartItem;