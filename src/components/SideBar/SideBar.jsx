import React from 'react';
import SideBarTab from './SideBarTab';
import { useDispatch } from 'react-redux';
import { AiFillHome, AiOutlineHeart } from 'react-icons/ai';
import { MdHistory, MdVideoLibrary, MdCollections, MdGroup } from 'react-icons/md';
import Button from '../Button';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';



const TABITEMS = [
  { label: 'Home', icon: <AiFillHome />, to: '/' },
  { label: 'Liked Videos', icon: <AiOutlineHeart />, to: '/liked' },
  { label: 'History', icon: <MdHistory />, to: '/history' },
  { label: 'My Content', icon: <MdVideoLibrary />, to: '/my-content' },
  { label: 'Collections', icon: <MdCollections />, to: '/collections' },
  { label: 'Subscribers', icon: <MdGroup />, to: '/subscribers' },
];


function SideBar({ sidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full">  
      <SideBarTab TABITEMS={TABITEMS} className="flex-grow" />  

      <div className='flex items-center justify-center mt-auto p-2'> 
        <Button onClick={() => {
          dispatch(logout());
          localStorage.removeItem("auth");
          navigate("/login");
        }}
          className="my-auto p-3">Logout</Button>
      </div>
    </div>
  );
}


export default SideBar;


