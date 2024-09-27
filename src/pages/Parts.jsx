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
    <>
      <div>
        <h1>Parts</h1>
        {!displayForm && <button onClick={() => setDisplayForm(true)}>Add New Part</button>}
        {displayForm && <NewPartForm setParts={setParts} setDisplayForm={setDisplayForm} />}
      </div>

      <div>
        { partItems }
      </div>
    </>
  );
}

export default Parts