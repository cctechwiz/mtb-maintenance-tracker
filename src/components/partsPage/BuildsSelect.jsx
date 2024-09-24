import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BuildsSelect = ({ setBuildId }) => {
  const [ builds, setBuilds ] = useState([]);

  const getUserBuilds = async () => {
    const res = await axios.get('/api/user-builds');

    if (res.data.success) {
      setBuilds(res.data.builds);
    }
  }

  useEffect(() => {
    getUserBuilds();
  }, [])

  const selectOptions = builds.map((build) => {
    return (
      <option key={build.id} value={build.id}>{build.name}</option>
    );
  });

  return (
    <>
      <label htmlFor="builds-select">Installed on (required):</label>
      <select
        name="builds"
        id="builds-select"
        defaultValue='choose'
        onChange={(e) => setBuildId(e.target.value)}
      >
        <option value="choose" disabled>Choose a build</option>
        {selectOptions}
        <option value="-" disabled>-</option>
        <option value={false}>Not installed</option>
      </select>
    </>
  )
}

export default BuildsSelect
