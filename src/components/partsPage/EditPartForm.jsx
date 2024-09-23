import React, { useState } from 'react'
import EditBuildSelect from './EditBuildSelect.jsx';

const EditPartForm = ({ partData }) => {
  const [ name, setName ] = useState(partData.name);
  const [ buildId, setBuildId ] = useState(partData.builds[0]?.id || false);


  console.log('buildId state:', buildId)

  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input 
          value={name}
          type="text"
          placeholder='Part name'
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <EditBuildSelect buildId={buildId} setBuildId={setBuildId} />
      </div>
      
      <div>
        {/* <label htmlFor="name">Name:</label>
        <input 
          value={name}
          type="text"
          placeholder='Part name'
          onChange={(e) => setName(e.target.value)}
        /> */}
      </div>

    </form>
  )
}

export default EditPartForm