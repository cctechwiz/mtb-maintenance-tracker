import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PartSelect = ({ partId, setPartId }) => {
  const [ userBuilds, setUserBuilds ] = useState([]);
  const [ userParts, setUserParts ] = useState([]);
  const [ buildId, setBuildId ] = useState('');
  const [ catId, setCatId ] = useState('');
  const [ parts, setParts ] = useState([]);

  const getUserParts = async () => {
    const res = await axios.get('/api/parts');

    if (res.data.success) {
      setUserParts(res.data.partsData);
    };
  };

  const getUserBuilds = async () => {
    const res = await axios.get('/api/user-builds');

    if (res.data.success) {
      setUserBuilds(res.data.builds)
    };
  };

  useEffect(() => {
    getUserParts();
    getUserBuilds();
  }, []);

  const buildOptions = userBuilds.map((build) => {
    return (
      <option key={build.id} value={build.id}>{build.name}</option>
    );
  });
  
  const catOptions = userParts.map((category) => {

    const catName = category.name[0].toUpperCase() + category.name.substring(1);

    return (
      <option key={category.id} value={category.id}>{catName}</option>
    )
  });

  const handlePartOptions = () => {
    // Only proceed if both build id and category id have been selected by user
    if (buildId && catId) {
      // Filter parts data for only data from category with id of catId
      const catData = userParts.filter((category) => +category.id === +catId)[0];

      // Initialize a parts array to store relevant parts
      const parts = [];

      // For each part type of the category, filter parts by buildId
      catData.part_types.forEach((partType) => {
        partType.parts.filter((part) => {
          // if user selected 'not installed' for build dropdown
          if (buildId === 'false') {
            return part.builds.length === 0;
          };

          // if user selected a build in build dropdown
          return +buildId === +part.builds[0]?.id;
          // add part to 'parts' array
        }).forEach((part) => parts.push(part));
      });

      // Set React state of parts to 'parts' array
      setParts(parts);
    };
  };

  useEffect(() => {
    handlePartOptions();
    setPartId('');
  }, [buildId, catId]);

  const partOptions = parts.map((part) => {
    return (
      <option key={part.id} value={part.id}>{part.name}</option>
    )
  });

  return (
    <div>
      <div>Select a Part</div>

      {/* Build Select */}
      <div>
        <label htmlFor="build">From Build:</label>
        <select 
          value={buildId}
          name="build" 
          id="build"
          onChange={(e) => setBuildId(e.target.value)}
        >
          <option value="" disabled>Choose a build</option>
          { buildOptions }
          <option value="-" disabled>-</option>
          <option value="false">Not installed</option>
        </select>
      </div>

      {/* Category Select */}
      <div>
        <label htmlFor="category">In Category:</label>
        <select 
          value={catId}
          name="category" 
          id="category"
          onChange={(e) => setCatId(e.target.value)}
        >
          <option value="" disabled>Choose a category</option>
          { buildId && catOptions }
        </select>
      </div>

      {/* Part Select */}
      <div>
        <label htmlFor="part">Part:</label>
        <select 
          value={partId}
          name="part" 
          id="part"
          onChange={(e) => setPartId(e.target.value)}
        >
          <option value="" disabled>Choose a part</option>
          { partOptions }
        </select>
      </div>
    </div>
  );
};

export default PartSelect;