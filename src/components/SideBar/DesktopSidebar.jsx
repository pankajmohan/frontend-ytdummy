import React from 'react';
import SideBar from './SideBar';

function DesktopSidebar({ collapsed }) {
  return (
    <aside
      className={`
        hidden md:flex flex-col bg-gray-900 text-white 
        transition-[width] duration-300 ease-in-out 
        ${collapsed ? 'w-20' : 'w-64'} border-t border-t-purple-500 
        overflow-hidden h-[calc(100vh-5rem)]
      `}
    >
      <div className="h-full px-2 py-20 ">
        <SideBar sidebarOpen={!collapsed} classname='pt-20'/>
      </div>
    </aside>
  );
}

export default DesktopSidebar;
