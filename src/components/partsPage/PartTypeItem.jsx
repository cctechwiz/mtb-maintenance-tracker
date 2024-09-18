import React from 'react'
import PartItem from './PartItem';

const PartTypeItem = ({ name, data }) => {
  // console.log('partType data:', data);

  const partItems = data.map((part) => {
    return (
      <PartItem
        key={part.id}
        name={part.name}
        build={part.builds}
      />
    )
  })

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