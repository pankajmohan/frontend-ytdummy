import React from 'react';
import SideBar from './SideBar';

function DesktopSidebar({ collapsed }) {
  return (
    <aside
      className={`
        bg-gray-900 text-white 
        transition-[width] duration-300 ease-in-out 
        ${collapsed ? 'w-24' : 'w-64'} 
        hidden md:flex flex-col p-4
        border-t border-t-purple-500 mt-20 overflow-hidden
      `}
    >
      <SideBar />
    </aside>
  );
}

export default DesktopSidebar;
