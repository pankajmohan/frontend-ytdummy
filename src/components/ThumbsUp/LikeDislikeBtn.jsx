import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from 'react-icons/fa';

function LikeDislikeBtn({ content, setContent, onLike, ondislike }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(()=>{
    
    setLiked(content?.isliked); 
    setDisliked(content?.isdisliked)
  },[content])
  

  const handleLike = () => {
    if (liked) {
      // setLiked(false);
      setContent(prev => ({ ...prev, liked: prev.liked - 1 }));
      onLike("minus");
    } else {
      setLiked(true);
      onLike("add");

      if (disliked) {
        setDisliked(false);
        setContent(prev => ({
          ...prev,
          isliked:true,
          isdisliked:false,
          liked: prev.liked + 1,
          disliked: prev.disliked - 1,
        }));
      } else {
        setContent(prev => ({ ...prev, liked: prev.liked + 1 }));
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setContent(prev => ({ ...prev, disliked: prev.disliked - 1 }));
      ondislike("minus");
    } else {
      setDisliked(true);
      ondislike("add");

      if (liked) {
        setLiked(false);
        setContent(prev => ({
          ...prev,
          isliked:false,
          isdisliked:true,
          disliked: prev.disliked + 1,
          liked: prev.liked - 1,
        }));
      } else {
        setContent(prev => ({ ...prev, disliked: prev.disliked + 1 }));
      }
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${liked ? 'text-blue-600 bg-gray-900' : 'text-gray-600 hover:text-blue-400'
          }`}
      >
        {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
        <span>{content?.liked}</span>
      </button>
      <button
        onClick={handleDislike}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${disliked ? 'text-red-600 bg-gray-900' : 'text-gray-600 hover:text-red-400'
          }`}
      >
        {disliked ? <FaThumbsDown /> : <FaRegThumbsDown />}
        <span>{content?.disliked}</span>
      </button>
    </div>
  );
}

export default LikeDislikeBtn;
