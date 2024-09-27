import React, { useState } from 'react';
import CategoryItem from './CategoryItem.jsx';
import EditBuildForm from './EditBuildForm.jsx';
import axios from 'axios';

const BuildItem = ({ data, partCategories, setUserBuilds }) => {
  const [ editMode, setEditMode ] = useState(false);
  const [ showDeleteOptions, setShowDeleteOptions ] = useState(false);
  const [ deleteParts, setDeleteParts ] = useState(false);

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

  const handleDeleteBuild = async (e) => {
    e.preventDefault();

    const res = await axios.delete(`/api/delete-build/${data.id}/${deleteParts}`);

    if (res.data.success) {
      const res = await axios.get('/api/builds');

      if (res.data.success) {
        setUserBuilds(res.data.userBuilds);
      };
    };
  };

  return !editMode ? (
    <div>
      <h2>{ data.name }</h2>
      <button onClick={toEditMode}>Edit</button>
      {!showDeleteOptions && <button onClick={() => setShowDeleteOptions(true)}>Delete</button>}
      {showDeleteOptions && 
        <div>
          Delete Build?
          <form onSubmit={handleDeleteBuild}>
            <div>
              <label htmlFor="delete-parts">Delete Parts On This Build Too?</label>
              <input
                value={deleteParts}
                type="checkbox"
                name=""
                id="delete-parts"
                onChange={() => setDeleteParts(!deleteParts)}
              />
            </div>

            <div>
              <input
                type="button"
                value="Cancel"
                onClick={() => setShowDeleteOptions(false)}
              />
              <input type="submit" value='Delete' />
            </div>
          </form>
        </div>
      }
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