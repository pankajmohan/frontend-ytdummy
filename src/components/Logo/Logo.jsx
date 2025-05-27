import React from 'react';
import { Link } from 'react-router-dom';
import { PiGooglePlayLogoDuotone } from "react-icons/pi";

function Logo() {
  return (
    <Link
      to="/"
      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
                 rounded-full flex items-center gap-3 px-6 py-2 
                 shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
    >
      <PiGooglePlayLogoDuotone className="text-2xl md:text-3xl" />
      <h2 className="text-xl md:text-2xl font-extrabold tracking-wide">Play</h2>
    </Link>
  );
}

export default Logo;
