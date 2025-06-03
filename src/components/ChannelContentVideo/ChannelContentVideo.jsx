import React, { useEffect, useState } from 'react';
import { PiGooglePlayLogoDuotone } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import api from '../../api/axios';
import VideoThumbs from '../VideoThumbs/VideoThumbs';
import { useSelector } from 'react-redux';

function ChannelContentVideo({ setOpen, myVideos, userinfo ,setMyVideos}) {
 
const handleRemoveVideo =async (video) =>{  

        const response = await api.post("/videos/deleteVideo",{
          videoId : video
        });
        setMyVideos(response.data.videos)

}
  return (
    <>
      {(!myVideos || myVideos.length === 0) ? (
        <div className="flex justify-center p-4 m-4">
          <div className="w-full max-w-sm text-center">
            <p className="mb-3 w-full">
              <span className="inline-flex rounded-full bg-purple-500 text-white p-4">
                <PiGooglePlayLogoDuotone size={48} />
              </span>
            </p>
            <h5 className="mb-2 font-semibold">No videos uploaded</h5>
            <p>This page has yet to upload a video. Search another page in order to find more videos.</p>
            <p><br />Click here to add <span onClick={() => setOpen(true)} className="text-purple-500 cursor-pointer">New Video</span></p>
          </div>
        </div>
      ) : (
        <main className="flex overflow-y-auto h-[calc(100vh-5rem)]">
          <div className="min-h-full w-full bg-gray-950 px-8 py-8 text-white">
            <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 md:ml-[30px] lg:ml-0">
              <div className="flex flex-wrap gap-4">
                {myVideos.map(video => (
                  <VideoThumbs key={video._id} video={video} userinfo={userinfo} isOwner={userinfo.isOwner} 
  onRemove = {handleRemoveVideo}/>
                ))}
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
}

export default ChannelContentVideo;
