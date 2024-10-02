import React, { useState } from 'react'
import PartItem from './PartItem';
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { Collapse } from 'react-collapse';


const PartTypeItem = ({ name, data, categoryId, setParts }) => {
  const [ showChildren, setShowChildren ] = useState(false);

  const partItems = data.sort((a, b) => a.id - b.id).map((part) => {
    return (
      <PartItem
        key={part.id}
        name={part.name} // delete later
        build={part.builds} // delete later
        partData={part}
        categoryId={categoryId}
        setParts={setParts}
      />
    );
  });

  return (
    <>
      <div className="secondary-row-container">
        <h3>
          <button onClick={() => setShowChildren(!showChildren)}>
            { name }
          </button>
        </h3>
        <button onClick={() => setShowChildren(!showChildren)}>
          {!showChildren ? <PiCaretDownBold /> : <PiCaretUpBold />}
        </button>
      </div>
      <div className="tertiary-items-container">
        <Collapse isOpened={showChildren}>
          <ul>
            {partItems}
          </ul>     
        </Collapse>
      </div>
    </>
  )
}

export default PartTypeItem