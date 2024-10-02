import React, { useState } from 'react'
import EditPartForm from './EditPartForm';
import axios from 'axios';
import { Collapse } from 'react-collapse';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { HiMiniXMark } from "react-icons/hi2";

const PartItem = ({ partData, categoryId, setParts }) => {
  const [ editMode, setEditMode ] = useState(false);
  const [ showChildren, setShowChildren ] = useState(false);
  const [ showDeleteOptions, setShowDeleteOptions ] = useState(false);

  // console.log('partData:', partData);

  let buildName = partData.builds.length !== 0 ? partData.builds[0].name : 'none';

  const toEditMode = () => {
    setEditMode(true)
  };

  const toViewMode = () => {
    setEditMode(false)
  }

  const handleDeletePart = async (e) => {
    e.preventDefault();

    const res = await axios.delete(`/api/delete-part/${partData.id}`)

    if (res.data.success) {
      const res = await axios.get('/api/parts');

      if (res.data.success) {
        setParts(res.data.partsData)
      };
    };
  };

  return (
    <li>
      <div className='tertiary-row-container'>
        <div className="tertiary-title-container">
          <button
            onClick={() => setShowChildren(!showChildren)}
          >
            { partData.name }
          </button>
          <button
            className='tertiary-icon-gray'
            onClick={toEditMode}
          >
            <MdModeEdit />
          </button>
          <button
            className='tertiary-icon-red'
            onClick={() => setShowDeleteOptions(true)}
          >
            <MdDelete />
          </button>
        </div>
        <button onClick={() => setShowChildren(!showChildren)}>
          {!showChildren ? <PiCaretDownBold /> : <PiCaretUpBold />}
        </button>
      </div>

      {editMode &&
        <>
          <div className="overlay"/>
          <div id='edit-modal' className='modal'>
            <div className="modal-x-container">
              <button onClick={toViewMode}>
                <HiMiniXMark className='modal-x-icon' />
              </button>
            </div>
            <div className="modal-title-container">
              <h2>Edit <i>{partData.name}</i> Part</h2>
            </div>

            <EditPartForm
              partData={partData}
              categoryId={categoryId}
              toViewMode={toViewMode}
              setParts={setParts}
            />
          </div>
        </>
      }

      {showDeleteOptions &&
        <>
          <div className="overlay" />
          <div className="modal">
            <div className="modal-x-container">
              <button onClick={() => setShowDeleteOptions(false)}>
                <HiMiniXMark className='modal-x-icon' />
              </button>
            </div>
            <div className="modal-title-container">
              <h2>Delete <i>{partData.name}</i>?</h2>
              <p className='text-sm'>This action can't be undone.</p>
            </div>
            <form
              className="modal-form"
              onSubmit={handleDeletePart}
            >
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

      <Collapse isOpened={showChildren}>
        <div className="quaternary-items-container">
          <span>Installed on: {buildName}</span>
        </div>
      </Collapse>
    </li>
  )
}

export default PartItem;