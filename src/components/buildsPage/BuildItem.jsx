import React from 'react';
import CategoryItem from './CategoryItem.jsx';

const BuildItem = ({ data, partCategories, setUserBuilds }) => {
  // console.log('build item data:', data)

  const categories = partCategories.map((category) => {
    // console.log('category:', category)

    const catName = category.name[0].toUpperCase() + category.name.substring(1);


    return (
      <CategoryItem 
        key={category.id}
        data={data}
        setUserBuilds={setUserBuilds}
        catName={catName}
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