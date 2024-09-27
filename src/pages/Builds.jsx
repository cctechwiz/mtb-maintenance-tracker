import React, { useEffect, useState } from 'react'
import BuildItem from '../components/buildsPage/BuildItem.jsx'
import NewBuildForm from '../components/buildsPage/NewBuildForm.jsx';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

const Builds = () => {
  const [ displayForm, setDisplayForm ] = useState(false);
  const [ userBuilds, setUserBuilds ] = useState(useLoaderData().userBuilds)
  const [ partCategories, setPartCategories ] = useState(useLoaderData().partCategories)

  // console.log('userBuilds: ', userBuilds)
  
  // Create BuildItem components
  const buildItems = userBuilds.sort((a, b) => a.id - b.id).map((build, index) => {
    return (
      <BuildItem 
        key={build.id}
        data={build}
        partCategories={partCategories}
        setUserBuilds={setUserBuilds}
        // categoriesData={build.categories}
      />
    )
  })

  return (
    <>
      <div>
        <h1>Builds</h1>
        {!displayForm && <button onClick={() => setDisplayForm(true)}>Add New Build</button>}
        {displayForm && <NewBuildForm setUserBuilds={setUserBuilds} setDisplayForm={setDisplayForm} />}
      </div>
        
      <div>
        { buildItems }
      </div>
    </>
  )
}

export default Builds