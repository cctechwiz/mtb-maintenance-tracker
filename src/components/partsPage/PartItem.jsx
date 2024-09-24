import React, { useState } from 'react'
import EditPartForm from './EditPartForm';
import axios from 'axios';

const PartItem = ({ partData, categoryId, setParts }) => {
  const [ editMode, setEditMode ] = useState(false);

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
      <span>Part name: { partData.name } | installed on: {buildName}</span>
      <button onClick={toEditMode}>Edit</button>
      <button onClick={handleDeletePart}>Delete</button>
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