import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function formatDuration(value) {
    if (!value) return "00:00";
    const [min, sec] = value.toString().split(".");
    const paddedSec = sec ? sec.padStart(2, "0") : "00";
    return `${min}:${paddedSec}`;
}

function VideoThumbsList({
    video = {},
    userinfo = {}
}) {
    const [showPreview, setShowPreview] = useState(false);

    const width = 'w_320';
    const height = 'h_200';
    const baseTransform = `${width},${height},c_fill,r_8,bo_1px_solid_rgb:888888,q_auto,f_auto`;

    const thumbnail = video?.thumbnail?.replace('/upload', `/upload/${baseTransform}`);

    // const avatar = userinfo?.avatar?.replace('/upload', '/upload/w_50,h_50,c_thumb,g_face,r_max');

    const videoPreview = video?.videoFile?.replace(
        '/upload',
        `/upload/so_1.5,du_3,${width},${height},c_fill,q_auto,f_auto`
    );

    const navigate = useNavigate();
    // console.log(video?._id);
    
    return (
        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[350px]"
        onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
      onTouchStart={() => setShowPreview(true)}
      onTouchEnd={() => setShowPreview(false)}
      onClick={() => navigate(`/watch-video/${video?._id}`)}
    >
            <div className="w-full gap-x-2 border border-gray-800 rounded-lg pr-2 md:flex p-2  hover:bg-gray-900">
                <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                    <div className="w-full pt-[56%]" >
                        <div className="absolute inset-0">
                            {
                                (showPreview && videoPreview) ?
                                    <video src={videoPreview}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover rounded"
                                        disablePictureInPicture 
                                    /> :
                                    <img src={thumbnail} alt="JavaScript Fundamentals: Variables and Data Types" className="h-full w-full" />


                            }
                        </div>
                        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                            {formatDuration(video.duration)}
                        </span>
                    </div>
                </div>
                <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5 hover:scale-105 hover:pl-1">
                    <div className="w-full pt-1 md:pt-0">
                        <h6 className="mb-1 text-sm font-semibold">{video.title}</h6>
                        <p className="mb-0.5 mt-2 text-sm text-gray-200">{userinfo.username}</p>
                        <p className="flex text-sm text-gray-200">{video.viewCount}&nbsp;Views · {dayjs(video.createdAt).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>);
}

export default VideoThumbsList;
