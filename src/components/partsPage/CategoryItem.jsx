import React from 'react';
import PartTypeItem from './PartTypeItem.jsx';

const CategoryItem = ({ name, data }) => {
  const partTypes = data.map((partType) => {
    const name = partType.name.split('_').map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');

    return (
      <PartTypeItem
        key={partType.id}
        name={name}
        data={partType.parts}
      />
    );
  });

  return (
    <>
      <h2>{ name }</h2>
      {partTypes}
    </>
  );
};

export default CategoryItem;