import React from 'react';
import PartItem from './PartItem.jsx';

const CategoryItem = ({ data, setUserBuilds, category }) => {
  const catName = category.name[0].toUpperCase() + category.name.substring(1);

  const catParts = data.parts.filter((part) => part.part_type.categoryId === category.id);
  
  const parts = catParts.sort((a, b) => a.id - b.id).map((part) => {
    return (
      <PartItem
        key={part.id}
        data={part}
        setUserBuilds={setUserBuilds}
      />
    );
  });

  return (
    <div>
      <h3>{ catName }</h3>
      <ul>
        { parts }
      </ul>
    </div>
  );
};

export default CategoryItem;