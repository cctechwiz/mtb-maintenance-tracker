import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BuildsSelect = () => {
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
      <label htmlFor="builds-select">Which build is it installed on?</label>
      <select name="builds" id="builds-select" defaultValue='choose'>
        <option value="choose" disabled>Choose a build</option>
        {selectOptions}
        <option value="-" disabled>-</option>
        <option value="none">Not installed yet</option>
      </select>
    </>
  )
}

export default BuildsSelect
