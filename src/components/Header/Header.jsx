import React from 'react';
import Input from '../Input';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiMenu } from 'react-icons/fi';
import Logo from '../Logo/Logo';


function Header({ toggleSidebar }) {
  const authStatus = useSelector(state => state.auth.status);
  const navigate = useNavigate();
  const user = useSelector(state=>state.auth.userData);  
  const avatar = user.data.user.avatar;
  const username = user.data.user.username
  
  return (
    <header className='bg-gray-900 text-white fixed top-0 left-0 w-full flex items-center justify-between p-4 z-50'>

      {/* Hamburger menu button: visible only on small screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 mr-2 rounded hover:bg-gray-700"
        aria-label="Toggle sidebar"
      >
        <FiMenu size={24} />
      </button>

      <div className='w-1/4 flex items-center gap-2'>
        <Logo />
      </div>

      {/* <Input placeholder="Search..." className="flex-1" /> */}

      {authStatus ? 
        
         (
         <button className="flex gap-4 text-left sm:items-center"  onClick={() => navigate("/my-content")} >
          <img src={avatar} className="h-8 w-8 shrink-0 rounded-full sm:h-12 sm:w-12"/>
                  {username}
            </button>
            )
       : (
        <button onClick={() => navigate("/login")} className="ml-auto">
          Login
        </button>
      )}
    </header>
  );
}

export default Header;
