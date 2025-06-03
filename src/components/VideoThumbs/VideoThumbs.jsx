import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import AlertDialog from '../AlertDialog';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function formatDuration(value) {
  if (!value) return "00:00";
  const [min, sec] = value.toString().split(".");
  const paddedSec = sec ? sec.padStart(2, "0") : "00";
  return `${min}:${paddedSec}`;
}

function formatNumber(value) {
  if (value == null || isNaN(value)) return '0';
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return value.toString();
  }
}

function VideoThumbs({
  video = {},
  userinfo = {},
  isOwner = false,
  onRemove = () => {}
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleRemove = () => {
    onRemove(video?._id);
  };

  const width = 'w_320';
  const height = 'h_200';
  const baseTransform = `${width},${height},c_fill,r_8,bo_1px_solid_rgb:888888,q_auto,f_auto`;

  const thumbnail = video?.thumbnail?.replace('/upload', `/upload/${baseTransform}`);
  const avatar = userinfo?.avatar?.replace('/upload', '/upload/w_50,h_50,c_thumb,g_face,r_max');
  const videoPreview = video?.videoFile?.replace(
    '/upload',
    `/upload/so_1.5,du_3,${width},${height},c_fill,q_auto,f_auto`
  );

  return (
    <>
      <div
        className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] bg-gray-900 border border-gray-900 rounded-md overflow-hidden shadow hover:shadow-purple-700 transition hover:border-purple-700 hover:shadow-md hover:scale-102"
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        onTouchStart={() => setShowPreview(true)}
        onTouchEnd={() => setShowPreview(false)}
      >
        <div className="relative mb-2 w-full pt-[56.25%]">
          {(isOwner && showPreview) && (
            <button
              onClick={() => setShowConfirm(true)}
              className="absolute top-2 right-2 z-10 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-100 transition-opacity duration-200 cursor-pointer"
            >
              Remove
            </button>
          )}

          <div className="absolute inset-0 rounded-md overflow-hidden" onClick={() => navigate(`/watch-video/${video?._id}`)}>
            {showPreview && videoPreview ? (
              <video
                src={videoPreview}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                disablePictureInPicture
              />
            ) : (
              <img
                src={thumbnail}
                alt={video?.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <span className="absolute bottom-1 right-1 inline-block rounded bg-black bg-opacity-75 px-2 py-0.5 text-sm text-white">
            {formatDuration(video?.duration)}
          </span>
        </div>

        <div className="flex gap-3 items-center px-3 py-2">
          <div className="h-10 w-10 shrink-0">
            <img
              src={avatar}
              alt="username"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center justify-between">
              <h6 className="font-semibold text-white truncate">{video?.title}</h6>
              <p className="text-sm text-gray-300 truncate">{formatNumber(video?.viewCount)} views</p>
            </div>
            <p
              className="text-sm text-gray-400 truncate cursor-pointer hover:text-purple-400"
              onClick={() => navigate(`/my-content/${userinfo.username}`)}
            >
              @{userinfo.username}
            </p>
          </div>
        </div>
      </div>

      <AlertDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleRemove}
        title="Delete Video?"
        message="Are you sure you want to permanently delete this video?"
        confirmText="Delete"
        cancelText="Cancel"
        type="confirm"
      />
    </>
  );
}

export default VideoThumbs;
