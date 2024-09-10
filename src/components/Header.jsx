import { NavLink } from 'react-router-dom'
import React from 'react'

const Header = () => {
  return (
    <div>
      <NavLink to='/'>Logo</NavLink>
      <ul>
        <li>
          <NavLink to='/builds'>Builds</NavLink>
        </li>
        <li>
          <NavLink to='/parts'>Parts</NavLink>
        </li>
        <li>
          <NavLink to='/rides'>Rides</NavLink>
        </li>
        <li>
          <NavLink to='/maintenance'>Maintenance</NavLink>
        </li>
        <li>
          <NavLink to='/settings'>User Settings</NavLink>
        </li>
        <li>
          <NavLink to='/auth'>Login</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Header