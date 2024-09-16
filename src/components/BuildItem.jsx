import React from 'react'
import { CategoryItem } from './CategoryItem'
import PartItem from './PartItem'

const BuildItem = ({ name }) => {
  return (
    <div>
      <h2>{ name }</h2>
    </div>
  )
}

export default BuildItem