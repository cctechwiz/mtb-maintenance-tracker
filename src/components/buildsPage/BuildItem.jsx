import React, { useState } from 'react';
import CategoryItem from './CategoryItem.jsx';
import EditBuildForm from './EditBuildForm.jsx';

const BuildItem = ({ data, partCategories, setUserBuilds }) => {
  const [ editMode, setEditMode ] = useState(false);

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

  const toEditMode = () => {
    setEditMode(true);
  };

  const toViewMode = () => {
    setEditMode(false);
  }

  console.log('build data:', data)
  return !editMode ? (
    <div>
      <h2>{ data.name }</h2>
      <button onClick={toEditMode}>Edit</button>
      <button>Delete</button>
      { categories }
    </div>
  ) : (
    <div>
      <h2> Edit Mode: { data.name }</h2>
      <EditBuildForm data={data} setUserBuilds={setUserBuilds} toViewMode={toViewMode} />
      <button onClick={toViewMode}>Cancel</button>
      { categories }
    </div>
  );
};

export default BuildItem;