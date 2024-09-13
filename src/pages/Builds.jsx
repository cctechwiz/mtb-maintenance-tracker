import React, { useState } from 'react'
import BuildItem from '../components/BuildItem.jsx'
import NewBuildForm from '../components/NewBuildForm.jsx';
import { useSelector } from 'react-redux';

const Builds = () => {
  const [ displayForm, setDisplayForm ] = useState(false);

  const builds = useSelector((state) => state.builds);

  console.log(`builds:`, builds)

  return (
    <>
      <h1>Builds</h1>
      {!displayForm && <button onClick={() => setDisplayForm(true)}>Add New Build</button>}
      {displayForm && <NewBuildForm />}
      <BuildItem />
    </>
  )
}

export default Builds