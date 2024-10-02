import React, { useState } from 'react'
import EditPartForm from './EditPartForm';
import axios from 'axios';
import { Collapse } from 'react-collapse';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

const PartItem = ({ partData, categoryId, setParts }) => {
  const [ editMode, setEditMode ] = useState(false);
  const [ showChildren, setShowChildren ] = useState(false);

  // console.log('partData:', partData);

  let buildName = partData.builds.length !== 0 ? partData.builds[0].name : 'none';

  const toEditMode = () => {
    setEditMode(true)
  };

  const toViewMode = () => {
    setEditMode(false)
  }

  const handleDeletePart = async () => {
    if (
      confirm(
        `Are you sure you want to delete this part:\n-${partData.name} (build: ${buildName})`
      )
    ) {
      const res = await axios.delete(`/api/delete-part/${partData.id}`)

      if (res.data.success) {
        const res = await axios.get('/api/parts');

        if (res.data.success) {
          setParts(res.data.partsData)
        };
      };
    };
  };

  return !editMode ? (
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
            onClick={handleDeletePart}
          >
            <MdDelete />
          </button>
        </div>
        <button onClick={() => setShowChildren(!showChildren)}>
          {!showChildren ? <PiCaretDownBold /> : <PiCaretUpBold />}
        </button>
      </div>
      <Collapse isOpened={showChildren}>
        <div className="quaternary-items-container">
          <span>Installed on: {buildName}</span>
        </div>
      </Collapse>
    </li>
  ) : (
    <li>
      Edit Mode is on for { partData.name }
      <button onClick={toViewMode}>Cancel</button>
      <EditPartForm
        partData={partData}
        categoryId={categoryId}
        toViewMode={toViewMode}
        setParts={setParts}
      />
    </li>
  )
}

export default PartItem