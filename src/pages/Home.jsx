import React from 'react';
import VideoThumb from '../components/VideoThumbs/VideoThumbs';

function Home() {
  return (
    <div className="min-h-full w-full bg-gray-950 px-8 py-8 text-white">
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="flex flex-wrap gap-4">
          <VideoThumb />
          <VideoThumb />
          <VideoThumb />
          <VideoThumb />
          <VideoThumb />
          <VideoThumb />
        </div>
      </section>
    </div>
  );
}

export default Home;
