import React from 'react';
import Logo from '../Logo/Logo';

function Loader() {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4 animate-pulse">
        <Logo />
        <span className="text-white text-sm tracking-wide">Loading, please wait...</span>
      </div>
    </div>
  );
}

export default Loader;
