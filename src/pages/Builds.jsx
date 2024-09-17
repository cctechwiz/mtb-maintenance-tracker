import React, { useEffect, useState } from 'react'
import BuildItem from '../components/BuildItem.jsx'
import NewBuildForm from '../components/NewBuildForm.jsx';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

const Builds = () => {
  const [ displayForm, setDisplayForm ] = useState(false);
  const [ builds, setBuilds ] = useState([])

  const { buildsData } = useLoaderData();

  // QUESTION: Is a useEffect necessary, and why does the useEffect work here?
  useEffect(() => {
    setBuilds(buildsData);
  }, []);
  
  // Create BuildItem components
  const buildItems = builds.map((build) => {
    return (
      <BuildItem 
        key={build.buildId}
        name={build.buildName}
        categoriesData={build.categories}
      />
    )
  })

  return (
    <>
      <div>
        <h1>Builds</h1>
        {!displayForm && <button onClick={() => setDisplayForm(true)}>Add New Build</button>}
        {displayForm && <NewBuildForm setBuildsData={setBuildsData} setDisplayForm={setDisplayForm} />}
      </div>
        
      <div>
        { buildItems }
      </div>
    </>
  )
}

export default Builds