import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryItem from '../components/partsPage/CategoryItem';

const Parts = () => {
  const [ displayForm, setDisplayForm ] = useState(false);
  const [ parts, setParts ] = useState([]);

  const { partsData } = useLoaderData();

  useEffect(() => {
    if (partsData) {
      setParts(partsData);
    };
  });

  console.log();
  console.log(partsData);
  console.log();
  const partItems = partsData.map((part) => {
    const name = part.name[0].toUpperCase() + part.name.substring(1)
    return (
      <CategoryItem
        key={part.id}
        name={ name }
        data={part.part_types}
      />
    );
  });

  return (
    <>
      <h1>Parts</h1>
      { partItems }
    </>
  );
}

export default Parts