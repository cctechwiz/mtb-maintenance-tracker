import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PartTypeSelect = ({ setTypeId, typeId }) => {
  const [ partCats, setPartCats ] = useState([]);
  const [ catId, setCatId ] = useState('');
  const [ partTypes, setPartTypes ] = useState([]);

  const getParts = async () => {
    const res = await axios.get('/api/part-types');

    if (res.data.success) {
      setPartCats(res.data.partTypes)
    }
  };

  useEffect(() => {
    getParts();
  }, []);

  const partCatOptions = partCats.map((partCat) => {
    const name = partCat.name[0].toUpperCase() + partCat.name.substring(1);
    return (
      <option key={partCat.id} value={partCat.id}>{name}</option>
    );
  });

  const handlePartTypes = () => {
    const partTypes = partCats.filter((partCat) => +partCat.id === +catId);

    if (partTypes.length) {
      setPartTypes(partTypes[0].part_types);
    } else {
      setPartTypes([]);
    };
  };
  
  useEffect(() => {
    handlePartTypes();
    setTypeId('');
  }, [catId]);

  const partTypeOptions = partTypes.map((partType) => {
    const name = partType.name.split('_').map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');

    return (
      <option key={partType.id} value={partType.id}>{name}</option>
    );
  });

  return (
    <>
      <div>
        <span htmlFor="part-type">What type of part is it?</span>
      </div>

      <div>
        <label htmlFor="category">Part Category (required):</label>
        <select
          id='category'
          name="part-category"
          value={catId}
          onChange={(e) => setCatId(e.target.value)}
        >
          <option value="" disabled>Choose a part category</option>
          {partCatOptions}
        </select>

        <label htmlFor="type">Part Type (required):</label>
        <select
          id='type'
          name="part-type"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
        >
          <option value="" disabled >{ catId ? 'Choose a part type' : '-' }</option>
          {partTypeOptions}
        </select>
      </div>
    </>
  )
}

export default PartTypeSelect