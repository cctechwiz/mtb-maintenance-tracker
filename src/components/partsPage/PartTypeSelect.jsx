import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PartTypeSelect = () => {
  const [ partCats, setPartCats ] = useState([]);
  const [ selectedCatId, setSelectedCatId ] = useState('');
  const [ partTypes, setPartTypes ] = useState([]); // or should I set default to null?

  const getParts = async () => {
    const res = await axios.get('/api/part-types');

    if (res.data.success) {
      setPartCats(res.data.partTypes)
    }
  };

  useEffect(() => {
    getParts();
  }, []);

  // DO I WANT TO GET PART TYPES WITH PART CATEGORY DATA INCLUDED???

  // if using Part Category > Part Type:
  // map part categories to create <option> elements
  // based on state of option selected:
  // map part types to create <option> elements
  // set partTypeId state based on part type option selected

  const partCatOptions = partCats.map((partCat) => {
    const name = partCat.name[0].toUpperCase() + partCat.name.substring(1);
    return (
      <option key={partCat.id} value={partCat.id}>{name}</option>
    );
  });

  const handlePartTypes = () => {
    const partTypes = partCats.filter((partCat) => +partCat.id === +selectedCatId);

    if (partTypes.length) {
      setPartTypes(partTypes[0].part_types);
    } else {
      setPartTypes([]);
    };
  };
  
  // Does the state of 'selectedCatId' change on render?
  useEffect(() => {
    handlePartTypes();
  }, [selectedCatId]);

  const partTypeOptions = partTypes.map((partType) => {
    const name = partType.name.split('_').map((word) => word[0].toUpperCase() + word.substring(1));

    return (
      <option key={partType.id} value={partType.id}>{name}</option>
    );
  });

  // console.log('partCats:', partCats);
  // console.log('selectedCatId:', selectedCatId);
  console.log('partTypes:', partTypes);
  // console.log('partCatOptions:', partCatOptions);

  return (
    <>
      <div>
        <span htmlFor="part-type">Choose a Part Type</span>
      </div>

      <div>
        <label htmlFor="category">Part Category:</label>
        <select id='category' name="part-category" defaultValue='default' onChange={(e) => setSelectedCatId(e.target.value)}>
          <option value="default" disabled>Choose a part category</option>
          {partCatOptions}
        </select>

        <label htmlFor="type">Part Type</label>
        <select id='type' name="part-type" defaultValue='default'>
          <option value="default" disabled>{ selectedCatId ? 'Choose a part type' : '-' }</option>
          {partTypeOptions}
        </select>
      </div>
    </>
  )
}

export default PartTypeSelect