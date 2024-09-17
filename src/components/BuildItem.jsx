import React from 'react';
import { CategoryItem } from './CategoryItem.jsx';

const BuildItem = ({ name, categoriesData }) => {
  const categories = categoriesData.map((category) => {
    return (
      <CategoryItem 
        key={category.categoryId}
        name={category.categoryName}
        partsData={category.parts}
      />
    );
  });

  return (
    <div>
      <h2>{ name }</h2>
      { categories }
    </div>
  );
};

export default BuildItem;