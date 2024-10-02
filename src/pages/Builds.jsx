import React, { useEffect, useState } from 'react'
import BuildItem from '../components/buildsPage/BuildItem.jsx'
import NewBuildForm from '../components/buildsPage/NewBuildForm.jsx';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

const Builds = () => {
  const [ displayForm, setDisplayForm ] = useState(false);
  const [ userBuilds, setUserBuilds ] = useState(useLoaderData().userBuilds);
  const [ partCategories, setPartCategories ] = useState(useLoaderData().partCategories);
  
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
    );
  });

  return (
    <div id='page-container' className='page-container'>
      <div id='title-container' className='title-container'>
        <h1>Builds</h1>
        <button
          className='btn-primary'
          onClick={() => setDisplayForm(true)}
        >
          + New Build
        </button>
      </div>

      {displayForm &&
        <NewBuildForm
          setUserBuilds={setUserBuilds}
          setDisplayForm={setDisplayForm}
        />
      }
        
      <div id='cards-container'>
        { buildItems }
      </div>
    </div>
  );
};

export default Builds;