import React from 'react';
import CategoryItem from './CategoryItem.jsx';

const BuildItem = ({ data, partCategories, setUserBuilds }) => {
  const categories = partCategories.map((category) => {
    return (
      <CategoryItem 
        key={category.id}
        data={data}
        setUserBuilds={setUserBuilds}
        category={category}
      />
    );
  });

  return (
    <div>
      <h2>{ data.name }</h2>
      { categories }
    </div>
  );
};

export default BuildItem;