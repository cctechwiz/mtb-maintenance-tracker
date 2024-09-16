import React, { useEffect, useState } from 'react'
import BuildItem from '../components/BuildItem.jsx'
import NewBuildForm from '../components/NewBuildForm.jsx';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

const Builds = () => {
  const [ displayForm, setDisplayForm ] = useState(false);
  const [ buildsData, setBuildsData ] = useState([])

  const { builds } = useLoaderData();

  // QUESTION: Is a useEffect necessary, and why does the useEffect work here?
  useEffect(() => {
    setBuildsData(builds);
  }, []);
  
  // console.log(`buildsData:`, buildsData)
  
  // QUESTION: 
  const buildItems = buildsData.map((build) => {
    return (
      <BuildItem key={build.id} name={build.name} />
    )
  })

  return (
    <>
      <div>
        <h1>Builds</h1>
        {!displayForm && <button onClick={() => setDisplayForm(true)}>Add New Build</button>}
        {displayForm && <NewBuildForm setBuildsData={setBuildsData} />}
      </div>
        
      <div>
        { buildItems }
      </div>
    </>
  )
}

export default Builds