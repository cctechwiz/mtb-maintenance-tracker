import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryItem from '../components/partsPage/CategoryItem';
import NewPartForm from '../components/partsPage/NewPartForm';

const Parts = () => {
  const [ displayForm, setDisplayForm ] = useState(false);
  const [ parts, setParts ] = useState(useLoaderData().partsData);

  const partCategories = parts.sort((a, b) => a.id - b.id).map((part) => {
    const name = part.name[0].toUpperCase() + part.name.substring(1)
    return (
      <CategoryItem
        key={part.id}
        name={ name }
        data={part.part_types}
        setParts={setParts}
      />
    );
  });

  return (
    <div id='page-container' className='page-container'>
      <div id='title-container' className='title-container'>
        <h1>Parts</h1>
        <button
          className='btn-primary'
          onClick={() => setDisplayForm(true)}
        >
          + New Part
        </button>
      </div>
      
      {displayForm &&
        <NewPartForm
          setParts={setParts}
          setDisplayForm={setDisplayForm}
        />
      }

      <div id='cards-container'>
        { partCategories }
      </div>
    </div>
  );
}

export default Parts