import React, { useState } from 'react';
import CategoryItem from './CategoryItem.jsx';
import EditBuildForm from './EditBuildForm.jsx';
import axios from 'axios';
import { Collapse } from 'react-collapse';
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const BuildItem = ({ data, partCategories, setUserBuilds }) => {
  const [ editMode, setEditMode ] = useState(false);
  const [ showDeleteOptions, setShowDeleteOptions ] = useState(false);
  const [ deleteParts, setDeleteParts ] = useState(false);
  const [ showChildren, setShowChildren ] = useState(false);

  const categories = partCategories.sort((a, b) => a.id - b.id).map((category) => {
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
    <div id='build-card' className='border-2 m-2 p-5 rounded-lg'>
      <div id='build-title' className='flex justify-between'>
        <div className='flex p-1 gap-2'>
          <h2 className='text-2xl'>
            <button onClick={() => setShowChildren(!showChildren)}>
              { data.name }
            </button>
          </h2>
          <button onClick={toEditMode}><MdModeEdit className='text-gray-300' /></button>
          {!showDeleteOptions && 
            <button onClick={() => setShowDeleteOptions(true)}>
              <MdDelete className='text-red-300' />
            </button>
          }
        </div>
        <button onClick={() => setShowChildren(!showChildren)}>
          {!showChildren ? <PiCaretDownBold /> : <PiCaretUpBold />}
        </button>
      </div>
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
      <div id='part-categories' className='px-3'>
        <Collapse isOpened={showChildren}>
          { categories }
        </Collapse>
      </div>
    </div>
  ) : (
    <div>
      <h2> Edit Mode: { data.name }</h2>
      <EditBuildForm data={data} setUserBuilds={setUserBuilds} toViewMode={toViewMode} />
      <button onClick={toViewMode}>Cancel</button>
      <Collapse isOpened={showChildren}>
        { categories }
      </Collapse>
    </div>
  );
};

export default BuildItem;