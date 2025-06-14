// components/UserDropdown.js
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';


function UserDropdown({ user, onClick }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleDropdown = () => setOpen(prev => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (type) => {
    setOpen(false)
    if (type == "MyContent") {
      navigate(`/my-content/${user?.username}`)
    }
    if (type == "Logout") {
      dispatch(logout());
      localStorage.removeItem('auth');
      navigate('/login');

    } 

  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center gap-2 hover:bg-gray-800 px-2 py-1 rounded">
        <img
          src={user?.avatar}
          alt="User Avatar"
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
        />
        <span className="hidden sm:inline text-sm font-medium">{user.fullName}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
          <button
            onClick={() => handleClick("MyContent")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            My Content
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            // onClick={() => navigate("/logout")}
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
            onClick={() => handleClick("Logout")}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
