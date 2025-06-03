import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import LikeDislikeBtn from '../components/ThumbsUp/LikeDislikeBtn';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


function VideoPlayer({ videoId, video, setVideo }) {
  // const [content, setContent] = useState({ liked: 0, disliked: 0 ,isliked: false, isdisliked: false})

  if (!video) {
    return (
      <div className="flex-1 min-h-[300px] flex items-center justify-center">
        <p className="text-gray-400">Loading video...</p>
      </div>
    );
  }

  const videoUrl = video.videoFile?.replace('/upload', '/upload/q_auto,f_auto');

  const handleLike = async() => {
    const response = await api.post("/videos/updateLikes",{
          videoId: videoId,
        })
            const liked = response?.data.data[0].liked;
        const disliked = response?.data.data[0].disliked;
        setVideo(prev => ({...prev, liked:liked, disliked:disliked}) )

  }

  const handleDislike = async() => {
        const response = await api.post("/videos/updateDislikes",{
          videoId: videoId,
        })
            const liked = response?.data.data[0].liked;
        const disliked = response?.data.data[0].disliked;
        setVideo(prev => ({...prev, liked:liked, disliked:disliked}) )

  }


  return (
    <div className="w-full lg:flex-1">
      <>
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          <video src={videoUrl} controls className="w-full h-full object-contain" disablePictureInPicture />
        </div>
        <div className='flex justify-between'>
          <div>
            <h2 className="text-xl sm:text-sm font-bold mt-4">{video.title}</h2>
            <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
              <span>{video?.viewCount} views • {dayjs(video?.createdAt).fromNow()}</span>
            </div>
          </div>
          <LikeDislikeBtn content={{ liked: video?.liked, disliked: video?.disliked , isliked: video?.isliked, isdisliked: video?.isdisliked }} setContent={setVideo} onLike={handleLike} ondislike={handleDislike} />


        </div>

      </>


    </div>
  );
}

export default VideoPlayer;
