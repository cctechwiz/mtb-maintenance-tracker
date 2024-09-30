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
    <div className='border-2 m-2 rounded-lg'>
      <div className='flex justify-between m-5'>
        <div className='flex p-1 gap-2'>
          <h2 className='text-2xl'>{ data.name }</h2>
          <button onClick={toEditMode}><MdModeEdit /></button>
          {!showDeleteOptions && <button onClick={() => setShowDeleteOptions(true)}><MdDelete /></button>}
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
      <Collapse isOpened={showChildren}>
        { categories }
      </Collapse>
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