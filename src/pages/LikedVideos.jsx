import React, { useEffect, useState } from 'react';
import VideoThumbs from '../components/VideoThumbs/VideoThumbs';
import { useSelector } from 'react-redux';
import api from "../api/axios";

function LikedVideos({ height = 'auto' }) {
  const [myVideos, setMyVideos] = useState([]);
  const sidebarWidth = useSelector((state) => state.sidebar.width);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await api.post('/videos/get-liked-video-list');
        setMyVideos(response.data.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }

    fetchVideos();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const computedWidth = isMobile ? '100vw' : `calc(100vw - ${sidebarWidth}px)`;

  return (
    <main
      className="overflow-y-auto bg-gray-950 text-white px-4 py-6 mt-16 transition-all duration-300"
      style={{ width: computedWidth, height }}
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <section className="pb-20">
          <div className="flex flex-wrap gap-4 justify-start">
            {myVideos.length > 0 ? (
              myVideos.map((video) => (
                <VideoThumbs key={video._id} video={video} userinfo={{avatar:video?.ownerInfo?.avatar, username :video?.ownerInfo?.username}}/>
              ))
            ) : (
              <div className="text-gray-400 text-center w-full mt-8">
                Loading videos or none found.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default LikedVideos;
