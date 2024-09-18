import React from 'react'

const PartItem = ({ name, build }) => {
  return (
    <li>Part name: { name } | installed on: {build[0].name}</li>
  )
}

export default PartItem