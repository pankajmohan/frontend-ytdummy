import React, { useEffect, useState } from 'react';
import VideoThumbs from '../components/VideoThumbs/VideoThumbs';
import { useSelector } from 'react-redux';
import api from "../api/axios";
function watchVideo(height = 'auto') {
  const sidebarWidth = useSelector((state) => state.sidebar.width);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const computedWidth = isMobile ? '100vw' : `calc(100vw - ${sidebarWidth}px)`;

  return (
    <main
      className="overflow-y-auto bg-gray-950 text-white px-4 py-6 mt-20 transition-all duration-300"
      style={{ width: computedWidth, height }}
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <section className="pb-20">
          <div className="flex flex-wrap gap-4 justify-start">
            <video >

            </video>
          </div>
        </section>
      </div>
    </main>
  );
}

export default watchVideo