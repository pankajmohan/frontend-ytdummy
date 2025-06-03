import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LikeDislikeBtn from '../ThumbsUp/LikeDislikeBtn';
import api from "../../api/axios";


function Comment({ comment }) {

  const [content, setContent] = useState({ isliked:false,
          isdisliked:false,
          liked: 0,
          disliked: 0,})

  useEffect(()=>{

    setContent((prev)=>(
      {...prev,
         liked:comment?.likeCount,
         disliked:comment?.dislikeCount, 
         isliked:comment?.isLiked , 
         isdisliked:comment?.isDisliked
      }
    )
  )

  },[comment])
  const handleLike = async () => {
    const response = await api.post("/comments/updateLikes", {
      commentId: comment._id
    })
    const liked = response?.data.data[0].liked;
    const disliked = response?.data.data[0].disliked;
    setContent(prev => ({ ...prev, liked: liked, disliked: disliked }))
  }

  const handleDislike = async () => {
    const response = await api.post("/comments/updateDislikes", {
      commentId: comment._id
    })
    const liked = response?.data.data[0].liked;
    const disliked = response?.data.data[0].disliked;
    setContent(prev => ({ ...prev, liked: liked, disliked: disliked }))

  }

  const commenterAvatar = comment?.commentedby?.avatar?.replace(
    '/upload',
    '/upload/w_40,h_40,c_thumb,g_face,r_max'
  );
  const navigate = useNavigate();
  return (
    <div className="mt-6 w-full bg-white dark:bg-gray-900 shadow-md rounded-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 ">
        {commenterAvatar && (
          <img
            src={commenterAvatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        )}

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 hover:underline cursor-pointer" onClick={() => navigate(`/my-content/${comment?.commentedby?.username}`)}>
              @{comment?.commentedby?.username || 'Unknown'}
            </h3>
            {/* Optional timestamp */}
            {/* <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">2 hours ago</span> */}
          </div>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">
            {comment?.content}
          </p>
        </div>
      </div>
      <LikeDislikeBtn content={content} setContent={setContent} onLike={handleLike} ondislike={handleDislike} />

    </div>
  );
}

export default Comment;
