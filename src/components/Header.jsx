import { NavLink, useNavigate } from 'react-router-dom'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

const Header = () => {
  const userId = useSelector((state) => state.userId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await axios.get('/api/logout');

    if (res.data.success) {
      dispatch({
        type: 'LOGOUT'
      })

      navigate('/auth');
    };
  };
  
  return (
    <div>
      <NavLink to='/'>MTB Maintenance Tracker</NavLink>
      {userId &&
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
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      }
    </div>
  )
}

export default Header