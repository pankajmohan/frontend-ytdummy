import React, { useEffect, useState } from 'react';
import VideoThumbs from '../components/VideoThumbs/VideoThumbs';
import { useSelector } from 'react-redux';
import api from "../api/axios";
import Loader from "../components/Loader/Loader"; // import loader

function Home({ height = 'auto' }) {
  const [myVideos, setMyVideos] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state
  const sidebarWidth = useSelector((state) => state.sidebar.width);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true); // start loading
      try {
        const response = await api.post('/videos/get-all-video-list');
        setMyVideos(response.data.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false); // stop loading
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
    <>
      {loading && <Loader />} {/* 👈 Show loader only during loading */}

      <main
        className="overflow-y-auto bg-gray-950 text-white px-4 py-6 mt-16 transition-all duration-300"
        style={{ width: computedWidth, height }}
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <section className="pb-20">
            <div className="flex flex-wrap gap-4 justify-start">
              {myVideos.length > 0 ? (
                myVideos.map((video) => (
                  <VideoThumbs
                    key={video._id}
                    video={video}
                    userinfo={{
                      avatar: video?.ownerInfo?.avatar,
                      username: video?.ownerInfo?.username,
                    }}
                  />
                ))
              ) : (
                !loading && (
                  <div className="text-gray-400 text-center w-full mt-8">
                    No videos found.
                  </div>
                )
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Home;
