import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../Button';
import api from '../../api/axios';

function NewComment({ videoId, onCommentAdded }) {
  const user = useSelector((state) => state.auth.userData);
  const avatar = user?.avatar?.replace(
    '/upload',
    '/upload/w_40,h_40,c_thumb,g_face,r_max'
  );

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const submitComment = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);
      const response = await api.post("/comments/new-comment", {
        videoId,
        content
      });
      // console.log("Comment submitted:", response.data);
      setContent('');
      if (onCommentAdded) onCommentAdded(response.data); // Optional callback to update parent
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 w-full">
      <div className="flex gap-4 items-start">
        {avatar && (
          <img
            src={avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        )}

        <div className="flex-1">
          <textarea
            placeholder="Add a comment..."
            rows="3"
            className="w-full bg-gray-900 border border-gray-700 text-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-1.5 rounded-md transition"
              onClick={submitComment}
              disabled={loading || !content.trim()}
            >
              {loading ? 'Posting...' : 'Comment'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewComment;
