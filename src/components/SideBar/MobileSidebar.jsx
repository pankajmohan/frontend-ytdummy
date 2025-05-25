import React from 'react';
import SideBar from './SideBar';

function MobileSidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white p-4 transform 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:hidden overflow-hidden
        `}
      >
        <SideBar />
      </aside>
    </>
  );
}

export default MobileSidebar;
