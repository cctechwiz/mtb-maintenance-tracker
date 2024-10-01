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
    <div id='page-container' className='w-full max-w-xl pt-20'>
      <div id='title-container' className='flex p-5 gap-5 w-full justify-between'>
        <h1 className='text-4xl'>Builds</h1>
        {!displayForm && 
          <button
            className='text-white bg-blue-light rounded-md px-4'
            onClick={() => setDisplayForm(true)}
          >
            + New Build
          </button>
        }
      </div>

      <div>
        {displayForm && <NewBuildForm setUserBuilds={setUserBuilds} setDisplayForm={setDisplayForm} />}
      </div>  
        
      <div id='primary-container'>
        { buildItems }
      </div>
    </div>
  )
}

export default Builds