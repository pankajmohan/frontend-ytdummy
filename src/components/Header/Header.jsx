import React from 'react';
import Input from '../Input';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiMenu } from 'react-icons/fi';
import Logo from '../Logo/Logo';

function Header({ toggleSidebar }) {
  const authStatus = useSelector(state => state.auth.status);
  const user = useSelector(state => state.auth.userData);  
  const navigate = useNavigate();
  const width = 'w_50';
  const height = 'h_50';
const avatar = user?.avatar.replace(
  '/upload/',
  `/upload/${width},${height},c_thumb,g_face,r_max/`
) + `?t=${Date.now()}`;    // avatar = avatar

  const fullName = user?.fullName;

  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 shadow-md">
      
      {/* Left: Logo + Sidebar Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-700"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={24} />
        </button>
        <Logo />
      </div>

      {/* Center: Search Input (optional) */}
      {/* <div className="hidden sm:block flex-1 max-w-md mx-4">
        <Input placeholder="Search..." />
      </div> */}

      {/* Right: User or Login */}
      <div className="flex items-center gap-4">
        {authStatus ? (
          <button
            onClick={() => navigate("/my-content")}
            className="flex items-center gap-2 hover:bg-gray-800 px-2 py-1 rounded"
          >
            <img
              src={avatar}
              alt="User Avatar"
              className="h-8 w-8 rounded-full sm:h-10 sm:w-10 object-cover"
            />
            <span className="hidden sm:inline text-sm font-medium">{fullName}</span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-medium hover:text-purple-400"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
