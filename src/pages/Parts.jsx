import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryItem from '../components/partsPage/CategoryItem';
import NewPartForm from '../components/partsPage/NewPartForm';

const Parts = () => {
  const [ displayForm, setDisplayForm ] = useState(false);
  const [ parts, setParts ] = useState(useLoaderData().partsData);

  const partItems = parts.sort((a, b) => a.id - b.id).map((part) => {
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
    <div id='page-container' className='w-full max-w-xl'>
      <div id='title-container' className='flex p-5 gap-5 w-full justify-between'>
        <h1 className='text-4xl'>Parts</h1>
        <button
          className='text-white bg-blue-light rounded-md px-4'
          onClick={() => setDisplayForm(true)}
        >
          + New Part
        </button>
      </div>
      
      {displayForm && <NewPartForm setParts={setParts} setDisplayForm={setDisplayForm} />}

      <div>
        { partItems }
      </div>
    </div>
  );
}

export default Parts