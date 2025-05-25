import React from 'react'
import { Link } from 'react-router-dom';
import { PiGooglePlayLogoDuotone } from "react-icons/pi";

function Logo() {
  return (
    <Link to={"/"} className='border border-purple-500 rounded-2xl flex items-center justify-around gap-2 px-10 py-2'>
                <PiGooglePlayLogoDuotone /> 
          <h2 className='text-lg font-bold text-white '>Play</h2>
        </Link>)
}

export default Logo;