import React, { useState } from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { useSelector } from 'react-redux';
import { fullscreen } from '../../store/sideBarSlice';


function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [sideFullScreen, setsideFullScreen] = useState(false);
  const sideFullScreen = useSelector((state => state.sidebar.status))
  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - no scroll */}
        <aside
          className={`
            bg-gray-900 text-white 
    transition-[width] duration-300 ease-in-out 
    ${sideFullScreen ? 'w-24' : 'w-64'}  p-4 hidden md:flex flex-col 
            border-t border-t-purple-500 mt-20 overflow-hidden
          `}
        >
          <SideBar sidebarOpen={sidebarOpen} />
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar - no scroll */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white p-4 transform 
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:hidden overflow-hidden
          `}
        >
          <SideBar sidebarOpen={sidebarOpen} />
        </aside>

        {/* Main Content - scrollable only here */}
        <main className="flex-1 mt-20 overflow-y-auto h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
