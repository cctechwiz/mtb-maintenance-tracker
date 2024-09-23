import React from 'react'
import PartItem from './PartItem';

const PartTypeItem = ({ name, data }) => {

  const partItems = data.map((part) => {
    return (
      <PartItem
        key={part.id}
        name={part.name} // delete later
        build={part.builds} // delete later
        partData={part}
      />
    );
  });

  return (
    <>
      <h3>{ name }</h3>
      <ul>
        {partItems}
      </ul>
    </>
  )
}

export default PartTypeItem