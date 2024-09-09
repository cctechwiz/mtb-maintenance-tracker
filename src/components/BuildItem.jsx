import React from 'react'
import { CategoryItem } from './CategoryItem'
import PartItem from './PartItem'

const BuildItem = () => {
  return (
    <div>
      <h2>Downhill</h2>
      <CategoryItem />
      <PartItem />
      <PartItem />
      <CategoryItem />
      <PartItem />
    </div>
  )
}

export default BuildItem