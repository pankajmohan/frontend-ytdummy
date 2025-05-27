import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function formatDuration(value) {
  if (!value) return "00:00";
  const [min, sec] = value.toString().split(".");
  const paddedSec = sec ? sec.padStart(2, "0") : "00";
  return `${min}:${paddedSec}`;
}

function VideoThumbs({
  video = { thumbnail: "", videoUrl: "", title: "", duration: "00:00", views: "" },
  userinfo={avatar:"", username :""}
}) {
  const [showPreview, setShowPreview] = useState(false);

  const width = 'w_320';
  const height = 'h_200';
  const baseTransform = `${width},${height},c_fill,r_8,bo_1px_solid_rgb:888888,q_auto,f_auto`;

  const thumbnail = video?.thumbnail?.replace('/upload', `/upload/${baseTransform}`);
  
  const avatar = userinfo?.avatar?.replace('/upload', '/upload/w_50,h_50,c_thumb,g_face,r_max');
  
  const videoPreview = video?.videoFile?.replace(
    '/upload',
    `/upload/so_1.5,du_3,${width},${height},c_fill,q_auto,f_auto`
  );
  
  const navigate = useNavigate();
  return (
    <div
      className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] bg-gray-900 border border-gray-900 rounded-md overflow-hidden shadow hover:shadow-purple-700 transition hover:border-purple-700 hover:shadow-md hover:scale-105"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
      onTouchStart={() => setShowPreview(true)}
      onTouchEnd={() => setShowPreview(false)}
    >
      <div className="relative mb-2 w-full pt-[56.25%]">
        <div className="absolute inset-0 rounded-md overflow-hidden" onClick={()=>navigate(`/watch-video/${video._id}`)}>
          {showPreview && videoPreview ? (
            <video
              src={videoPreview}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={thumbnail}
              alt={video.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <span className="absolute bottom-1 right-1 inline-block rounded bg-black bg-opacity-75 px-2 py-0.5 text-sm text-white">
          {formatDuration(video.duration)}
        </span>
      </div>

      <div className="flex gap-3 items-center px-3 py-2 ">
        <div className="h-10 w-10 shrink-0">
          <img
            src={avatar}
            alt="codemaster"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <h6 className="font-semibold text-white truncate">{video.title}</h6>
          <p className="text-sm text-gray-300 truncate">{video.views}</p>
          <p className="text-sm text-gray-400 truncate" onClick={()=>navigate(`/my-content/${userinfo.username}`)}>{userinfo.username}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoThumbs;
