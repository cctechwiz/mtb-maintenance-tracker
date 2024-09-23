import React, { useState } from 'react'
import EditPartForm from './EditPartForm';

const PartItem = ({ name, build, partData }) => {
  const [ editMode, setEditMode ] = useState(false);

  // console.log('partData:', partData);

  let buildName = partData.builds.length !== 0 ? partData.builds[0].name : 'none';

  const toEditMode = () => {
    setEditMode(true)
  };

  const toViewMode = () => {
    setEditMode(false)
  }

  return !editMode ? (
    <li>
      <span>Part name: { partData.name } | installed on: {buildName}</span>
      <button onClick={toEditMode}>Edit</button>
      {/* <button>Delete</button> */}
    </li>
  ) : (
    <li>
      Edit Mode is on for { partData.name }
      <button onClick={toViewMode}>Cancel</button>
      <EditPartForm partData={partData} />
    </li>
  )
}

export default PartItem