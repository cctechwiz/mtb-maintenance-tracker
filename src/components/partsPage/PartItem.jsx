import React from 'react'

const PartItem = ({ name, build }) => {
  let buildName = build[0] ? build[0].name : 'none';

  return (
    <li>Part name: { name } | installed on: {buildName}</li>
  )
}

export default PartItem