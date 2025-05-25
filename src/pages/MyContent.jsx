import React from 'react';
import { useSelector } from 'react-redux';
import CoverImage from '../components/CoverImage';
import Button from '../components/Button'
import UserChannelData from '../components/UserChannelData/UserChannelData';
import ChannelContentVideo from '../components/ChannelContentVideo/ChannelContentVideo';
function MyContent() {
  const user = useSelector((state) => state.auth.userData);

  return (
    <main className="mt-20 overflow-y-auto h-[calc(100vh-5rem)] bg-gray-950 text-white border border-t-purple-500">
      <CoverImage src={user.data.user.coverImage} alt="Cover" height="16rem" />
      <div className="px-4 pb-4">
        <UserChannelData user={user} />
        {/* <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
          <li className="w-full">
            <Button className="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">Videos</Button>
          </li>
          <li className="w-full">
            <Button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">Playlist</Button>
          </li>
          <li className="w-full"><Button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">Tweets</Button></li>
          <li className="w-full"><Button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">Subscribed</Button></li>
        </ul> */}
        <ChannelContentVideo />


        
      </div>

    </main>
  );

}

export default MyContent;
