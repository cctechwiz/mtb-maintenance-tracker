import React, { useState } from 'react';
import CategoryItem from './CategoryItem.jsx';
import EditBuildForm from './EditBuildForm.jsx';
import axios from 'axios';
import { Collapse } from 'react-collapse';
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { HiMiniXMark } from "react-icons/hi2";

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

  return (
    <div id='build-card' className='card-container'>
      <div id='build-row-container' className='primary-row-container'>
        <div className='primary-title'>
          <h2>
            <button onClick={() => setShowChildren(!showChildren)}>
              { data.name }
            </button>
          </h2>
          <button onClick={toEditMode}><MdModeEdit className='primary-icon-gray' /></button>
          {!showDeleteOptions && 
            <button onClick={() => setShowDeleteOptions(true)}>
              <MdDelete className='primary-icon-red' />
            </button>
          }
        </div>
        <button onClick={() => setShowChildren(!showChildren)}>
          {!showChildren ? <PiCaretDownBold /> : <PiCaretUpBold />}
        </button>
      </div>

      {showDeleteOptions && 
        <>
          <div id='overlay' className='overlay' />
          <div id='delete-modal' className='modal'>
            <div id='modal-x-container' className='modal-x-container'>
              <button onClick={() => setShowDeleteOptions(false)}>
                <HiMiniXMark className='modal-x-icon' />
              </button>
            </div>
            <div className='modal-title-container'>
              <h2>Delete <i>{ data.name }</i> Build?</h2>
              <p className='text-sm'>This action can't be undone.</p>
            </div>
            <form onSubmit={handleDeleteBuild} className='modal-form'>

              <div id='part-delete-checkbox-container' className='checkbox-container'>
                <label htmlFor="delete-parts">Delete parts installed on <i>{ data.name }</i> too?</label>
                <input
                  className='checkbox'
                  value={deleteParts}
                  type="checkbox"
                  name=""
                  id="delete-parts"
                  onChange={() => setDeleteParts(!deleteParts)}
                />
              </div>

              <div id='buttons-container' className='modal-bottom-btns-container'>
                <button
                  className='btn-cancel'
                  type='button' 
                  onClick={() => setShowDeleteOptions(false)}
                >
                  Cancel
                </button>
                <button
                  className='btn-delete'
                  type="submit"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </>
      }

      {editMode &&
        <>
          <div id='overlay' className='overlay' />
          <div id='edit-modal' className='modal'>
            <div className='modal-x-container'>
              <button onClick={toViewMode}>
                <HiMiniXMark className='modal-x-icon' />
              </button>
            </div>

            <div className='modal-title-container'>
              <h2> Edit: { data.name }</h2>
            </div>

            <EditBuildForm
              className='modal-form'
              data={data}
              setUserBuilds={setUserBuilds}
              toViewMode={toViewMode}
            />
          </div>
        </>
      }
      
      <div id='part-categories' className='secondary-items-container'>
        <Collapse isOpened={showChildren}>
          { categories }
        </Collapse>
      </div>
    </div>
  );
};

export default BuildItem;