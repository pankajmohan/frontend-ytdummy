import React from 'react';
import Input from '../Input';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu } from 'react-icons/fi';
import Logo from '../Logo/Logo';
import { useMemo } from 'react';
import UserDropdown from '../UserDropdown ';
import { logout } from '../../store/authSlice';

function Header({ toggleSidebar }) {
  const authStatus = useSelector(state => state.auth.status);
  const user = useSelector(state => state.auth.userData);  
  const navigate = useNavigate();
    const dispatch = useDispatch();
  
  // const width = 'w_50';
  // const height = 'h_50';
// const avatar = user?.avatar.replace(
//   '/upload/',
//   `/upload/${width},${height},c_thumb,g_face,r_max/`
// ) + `?t=${Date.now()}`;    // avatar = avatar

const avatar = useMemo(() => {
  if (!user?.avatar) return '';
  const width = 'w_50';
  const height = 'h_50';
  return (
    user.avatar.replace(
      '/upload/',
      `/upload/${width},${height},c_thumb,g_face,r_max/`
    ) + `?t=${Date.now()}`
  );
}, [user?.avatar]);
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
<UserDropdown user={{ ...user, avatar }} />        ) : (
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
