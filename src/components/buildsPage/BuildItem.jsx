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
    <div id='build-card' className='border-2 m-2 p-5 rounded-lg'>
      <div id='build-title' className='flex justify-between'>
        <div className='flex p-1 gap-2'>
          <h2 className='text-2xl'>
            <button onClick={() => setShowChildren(!showChildren)}>
              { data.name }
            </button>
          </h2>
          <button onClick={toEditMode}><MdModeEdit className='text-gray-300 h-5 w-5' /></button>
          {!showDeleteOptions && 
            <button onClick={() => setShowDeleteOptions(true)}>
              <MdDelete className='text-red-300 h-5 w-5' />
            </button>
          }
        </div>
        <button onClick={() => setShowChildren(!showChildren)}>
          {!showChildren ? <PiCaretDownBold /> : <PiCaretUpBold />}
        </button>
      </div>

      {showDeleteOptions && 
        <>
          <div id='overlay' className='fixed top-0 left-0 right-0 bottom-0 bg-black/60 bg-transparent-70' />
          <div id='delete-modal' className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 z-1000 rounded-lg w-[95%] max-w-md md:max-w-lg lg:max-w-xl'>
            <div className='flex justify-end items-start'>
              <button onClick={() => setShowDeleteOptions(false)}>
                <HiMiniXMark className='h-6 w-6' />
              </button>
            </div>
            <div className='mb-5 mx-3'>
              <h3 className='text-2xl '>Delete <i>{ data.name }</i> Build?</h3>
              <p className='text-sm'>This action can't be undone.</p>
            </div>
            <form onSubmit={handleDeleteBuild} className='flex flex-col gap-4 mb-3 mx-3'>

              <div id='part-delete-checkbox-container' className='flex items-center gap-3'>
                <label htmlFor="delete-parts">Delete parts installed on <i>{ data.name }</i> too?</label>
                <input
                  className='h-5 w-5'
                  value={deleteParts}
                  type="checkbox"
                  name=""
                  id="delete-parts"
                  onChange={() => setDeleteParts(!deleteParts)}
                />
              </div>

              <div id='buttons-container' className='flex justify-between mt-2'>
                <button
                  className='text-gray-400 bg-white border-2 border-gray-400 rounded-md px-4 py-1'
                  type='button' 
                  onClick={() => setShowDeleteOptions(false)}
                >
                  Cancel
                </button>
                <button
                  className='text-white bg-red-500 border-2 border-red-500 rounded-md px-4 py-1'
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
          <div id='overlay' className='fixed top-0 left-0 right-0 bottom-0 bg-black/60 bg-transparent-70' />
          <div id='edit-modal' className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 z-1000 rounded-lg w-[95%] max-w-md md:max-w-lg lg:max-w-xl'>
          <div className='flex justify-end items-start'>
              <button onClick={toViewMode}>
                <HiMiniXMark className='h-6 w-6' />
              </button>
            </div>

            <div>
              <h3 className='text-2xl mb-5 mx-3'> Edit: { data.name }</h3>
              <EditBuildForm data={data} setUserBuilds={setUserBuilds} toViewMode={toViewMode} />
              {/* <button onClick={toViewMode}>Cancel</button> */}

            </div>
          </div>
        </>
      }
      
      <div id='part-categories' className='px-3'>
        <Collapse isOpened={showChildren}>
          { categories }
        </Collapse>
      </div>
    </div>
  );
};

export default BuildItem;