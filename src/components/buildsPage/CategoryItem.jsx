import React from 'react';
import PartItem from './PartItem.jsx';

const CategoryItem = ({ data, setUserBuilds, catName }) => {
  console.log('data in CategoryItem:', data)
  
  // const parts = data.map((part) => {
  //   return (
  //     <></>
  //     // <PartItem
  //     //   key={part.partId}
  //     //   name={part.partName}
  //     // />
  //   );
  // });

  return (
    <div>
      <h3>{ catName }</h3>
      <ul>
        {/* { parts } */}
      </ul>
    </div>
  );
};

export default CategoryItem;