import React from 'react';
import CategoryItem from './CategoryItem.jsx';

const BuildItem = ({ data, partCategories }) => {
  // console.log('build item data:', data)

  // const categories = categoriesData.map((category) => {
  //   return (
  //     <></>
  //     // <CategoryItem 
  //     //   key={category.categoryId}
  //     //   name={category.categoryName}
  //     //   partsData={category.parts}
  //     // />
  //   );
  // });

  return (
    <div>
      <h2>{ data.name }</h2>
      {/* { categories } */}
    </div>
  );
};

export default BuildItem;