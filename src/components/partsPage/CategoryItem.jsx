import React, { useState } from 'react';
import PartTypeItem from './PartTypeItem.jsx';
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { Collapse } from 'react-collapse';

const CategoryItem = ({ name, data, setParts }) => {
  const [ showChildren, setShowChildren ] = useState(false);
  
  const partTypes = data.sort((a, b) => a.id - b.id).map((partType) => {
    const name = partType.name.split('_').map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');

    return (
      <PartTypeItem
        key={partType.id}
        name={name}
        data={partType.parts}
        categoryId={partType.categoryId}
        setParts={setParts}
      />
    );
  });

  return (
    <div id='part-category-card' className='card-container'>
      <div id='part-category-row-container' className='primary-row-container'>
        <div id='part-category-title' className='primary-title'>
          <h2>
            <button onClick={() => setShowChildren(!showChildren)}>
              { name }
            </button>
          </h2>
        </div>
        <button onClick={() => setShowChildren(!showChildren)}>
          {!showChildren ? <PiCaretDownBold /> : <PiCaretUpBold />}
        </button>
      </div>

      <div className="secondary-items-container">
        <Collapse isOpened={showChildren}>
          { partTypes }
        </Collapse>
      </div>
    </div>
  );
};

export default CategoryItem;