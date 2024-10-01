import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { IoMdMenu } from "react-icons/io";

const Header = () => {
  const userId = useSelector((state) => state.userId);

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await axios.get("/api/logout");

    if (res.data.success) {
      dispatch({
        type: "LOGOUT",
      });

      navigate("/auth");
    }
  };

  return (
    <>
      {/* Mobile View */}
      <nav className="flex lg:hidden justify-between h-[10vh] items-center px-8 bg-blue-dark text-white sticky top-0">
        <div>
          <span className='text-2xl'><NavLink to="/" >MTB Maintenance Tracker</NavLink></span>
        </div>
        <div>
          {userId &&
            <button>
              <IoMdMenu className="h-[32px] w-[32px]" onClick={() => setShowMenu(!showMenu)} />
            </button>
          }
        </div>
        {showMenu && (
          <ul className="absolute left-0 top-[10vh] bg-blue-medium h-[90vh] px-5 pt-5 flex flex-col gap-5">
            <li>
              <NavLink onClick={() => setShowMenu(false)} to="/builds">Builds</NavLink>
            </li>
            <li>
              <NavLink onClick={() => setShowMenu(false)} to="/parts">Parts</NavLink>
            </li>
            {/* <li>
              <NavLink onClick={() => setShowMenu(false)} to='/rides'>Rides</NavLink>
            </li> */}
            <li>
              <NavLink onClick={() => setShowMenu(false)} to="/maintenance">Maintenance</NavLink>
            </li>
            {/* <li>
                <NavLink onClick={() => setShowMenu(false)} to='/settings'>User Settings</NavLink>
            </li> */}
            <li>
              <button onClick={() => {
                handleLogout();
                setShowMenu(false);
              }}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* Desktop View */}
      <nav className="hidden lg:flex justify-between h-[10vh] items-center px-8 bg-blue-dark text-white sticky top-0">
        <div>
          <NavLink className='text-2xl' to="/">MTB Maintenance Tracker</NavLink>
        </div>
        {userId && (
          <ul className="flex justify-between w-1/3">
            <li>
              <NavLink to="/builds">Builds</NavLink>
            </li>
            <li>
              <NavLink to="/parts">Parts</NavLink>
            </li>
            {/* <li>
              <NavLink to='/rides'>Rides</NavLink>
              </li> */}
            <li>
              <NavLink to="/maintenance">Maintenance</NavLink>
            </li>
            {/* <li>
              <NavLink to='/settings'>User Settings</NavLink>
              </li> */}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Header;
