import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function CoverImage({ src, alt, height = '16rem' }) {
  const sidebarWidth = useSelector((state) => state.sidebar.width);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Tailwind's md breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const computedWidth = isMobile
    ? '100vw'
    : `calc(100vw - ${sidebarWidth}px)`;

  return (
    <div className="relative w-full">
      <div
        className="mx-auto"
        style={{
          width: computedWidth,
          height,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-md p-2 pb-0"
        />
      </div>
    </div>
  );
}

export default CoverImage;
