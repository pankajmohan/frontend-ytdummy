import React from 'react';
import SideBarTab from './SideBarTab';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiFillHome,
  AiOutlineHeart,
} from 'react-icons/ai';
import {
  MdHistory,
  MdVideoLibrary,
  MdCollections,
  MdGroup,
} from 'react-icons/md';
import Button from '../Button';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';


function SideBar({ sidebarOpen,classname="" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(state=>state.auth.userData?.username);
const TABITEMS = [
  { label: 'Home', icon: <AiFillHome />, to: '/' },
  { label: 'Liked Videos', icon: <AiOutlineHeart />, to: '/my-liked-videos' },
  { label: 'History', icon: <MdHistory />, to: '/my-watched-videos' },
  // { label: 'My Content', icon: <MdVideoLibrary />, to: `/my-content/${username}` },
  { label: 'Collections', icon: <MdCollections />, to: '/collections' },
  { label: 'Subscribers', icon: <MdGroup />, to: '/subscribers/myself' },
];

  return (
    <aside
      className={`bg-gray-900 text-white h-screen w-64 fixed top-0 left-0 z-40 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 ${classname}`}
    >
      <div className="flex flex-col flex-grow overflow-y-auto px-2 pt-6 pb-4">
        <SideBarTab TABITEMS={TABITEMS} />
      </div>

      {/* Logout button pinned at bottom */}
      <div className="p-4 border-t border-gray-700">
        <Button
          onClick={() => {
            dispatch(logout());
            localStorage.removeItem('auth');
            navigate('/login');
          }}
          className="w-full py-2 hover:bg-red-600 bg-red-500 text-white font-medium"
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}

export default SideBar;
