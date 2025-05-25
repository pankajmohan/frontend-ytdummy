import React, { useEffect } from 'react';
import VideoThumbs from '../components/VideoThumbs/VideoThumbs';
import { useDispatch } from 'react-redux';

function Home() {
  return (
    <main className="flex mt-20 overflow-y-auto h-[calc(100vh-5rem)]">

      <div className="min-h-full w-full bg-gray-950 px-8 py-8 text-white">
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex flex-wrap gap-4">
            <VideoThumbs />
            <VideoThumbs />
            <VideoThumbs />
            <VideoThumbs />
            <VideoThumbs />
            <VideoThumbs />
          </div>
        </section>
      </div>
    </main>

  );
}

export default Home;
