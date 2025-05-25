import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBarTab({ TABITEMS }) {
  return (
    <ul>
      {TABITEMS.map(({ label, icon, to }) => (
        <li key={label}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 m-2 p-3 rounded transition-all duration-200 text-purple-400  
               ${isActive ? 'bg-purple-700 font-semibold text-white ' : 'hover:bg-gray-800 hover:text-purple-200'} `
            }
          >
            <span className="text-lg">{icon}</span>
            <span className="text-sm md:text-base">{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default SideBarTab;
