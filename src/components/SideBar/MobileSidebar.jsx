import React from 'react';
import SideBar from './SideBar';

function MobileSidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeSidebar}
          aria-label="Close sidebar backdrop"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:hidden flex flex-col
        `}
        aria-hidden={!isOpen}
        role="complementary"
      >
        {/* Prevent sidebar from closing when clicked */}
        <div
          className="h-full overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <SideBar sidebarOpen={isOpen} closeSidebar={closeSidebar}/>
        </div>
      </aside>
    </>
  );
}

export default MobileSidebar;
