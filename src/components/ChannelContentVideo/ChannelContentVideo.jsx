import React from 'react'

import { PiGooglePlayLogoDuotone, PiPlusDuotone } from "react-icons/pi";
import { NavLink } from 'react-router-dom';

function ChannelContentVideo() {
  return (
    <div><div className="flex justify-center p-4 m-4">
          <div className="w-full max-w-sm text-center">
            <p className="mb-3 w-full">
              <span className="inline-flex rounded-full bg-purple-500 text-white p-4">
                <PiGooglePlayLogoDuotone size={48} />
              </span>
            </p>
            <h5 className="mb-2 font-semibold">No videos uploaded</h5>
            <p>This page has yet to upload a video. Search another page in order to find more videos.</p>
            <p><br />Click here to add <NavLink to={""} className="text-purple-500"> New Video</NavLink> </p>
          </div>
        </div></div>
  )
}

export default ChannelContentVideo