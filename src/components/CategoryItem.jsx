import React from 'react';
import PartItem from './PartItem.jsx';

export const CategoryItem = ({ name, partsData }) => {
  const parts = partsData.map((part) => {
    return (
      <PartItem
        key={part.partId}
        name={part.partName}
      />
    );
  });

  return (
    <div>
      <h3>{ name }</h3>
      <ul>
        { parts }
      </ul>
    </div>
  );
}
