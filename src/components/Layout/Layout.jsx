import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login as authLogin } from '../../store/authSlice';

import Header from '../Header/Header';
import DesktopSidebar from '../SideBar/DesktopSidebar';
import MobileSidebar from '../SideBar/MobileSidebar';

function Layout() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sideFullScreen = useSelector((state) => state.sidebar.status);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      dispatch(authLogin(JSON.parse(storedAuth)));
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen ">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />


      <div className="flex h-screen">
      <DesktopSidebar collapsed={sideFullScreen} />
        <MobileSidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      <Outlet />
    </div>
    </div>
  );
}

export default Layout;
