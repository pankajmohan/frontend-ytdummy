import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import VideoThumbsList from '../components/VideoThumbs/VideoThumbsList';
import NewComment from '../components/Comment/NewComment';
import Comment from '../components/Comment/Comment';
import api from "../api/axios";
function WatchVideo({ height = 'auto' }) {
  const sidebarWidth = useSelector((state) => state.sidebar.width);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [myVideos, setMyVideos] = useState([]);
  const [comments, setComments] = useState([]);

  const [video, setVideo] = useState({});
  const [page, setPage] = useState(0);
  // const [content, setContent] = ({});
  const { videoId } = useParams();

  useEffect(() => {
    const increaseView = async () => {
      try {
        const response = await api.patch('/videos/increase-view', {
          videoId: videoId,
        });
        // console.log(response);
        
        setVideo(response.data.data[0])
      } catch (error) {
        console.error("Error increasing view:", error);
        setVideo({});
      }
    };

    if (video) {
      increaseView();
    }
  }, [videoId]);
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await api.post('/videos/get-related-video-list',{videoId});
        setMyVideos(response.data.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, [videoId]);
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await api.post('/comments/get-comments', {
          videoId: videoId,
          page: page
        });
        // console.log(response.data.data);

        setComments(response.data.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]); // fallback
      }
    }
    fetchComments();
  }, [page, videoId]);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const computedWidth = isMobile ? '100vw' : `calc(100vw - ${sidebarWidth}px)`;
  const uploaderAvatar = video.owner?.avatar?.replace(
    '/upload',
    '/upload/w_40,h_40,c_thumb,g_face,r_max'
  );

  return (
    <main
      className="overflow-y-auto bg-gray-950 text-white px-4 py-4 mt-18 transition-all duration-300"
      style={{ width: computedWidth, height }}
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <section className="pb-20">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:flex-1">

              <VideoPlayer videoId={video._id} video={video} setVideo={setVideo} />
              <div className="flex items-center gap-3 mt-4">
                {uploaderAvatar && (
                  <img src={uploaderAvatar} alt="Uploader" className="h-10 w-10 rounded-full" />
                )}
                <div>
                  <p className="font-semibold">{video.owner?.fullName}</p>
                  <p className="text-sm text-gray-400">@{video.owner?.username}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-300 whitespace-pre-line">{video.description}</p>
              </div>

              <NewComment videoId={videoId} onCommentAdded={setComments} />

              <div className="mt-6 space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <Comment key={comment._id} comment={comment}/>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>

            <aside
              className="w-full lg:w-[350px] space-y-4 overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 5rem)' }}
            >
              <h2 className="text-lg font-semibold mb-2">Recommended</h2>
              {myVideos.length > 0 ? (
                myVideos.map((video) => (
                  <VideoThumbsList
                    key={video._id}
                    video={video}
                    setVideo={setVideo}
                    userinfo={{
                      avatar: video?.ownerInfo?.avatar,
                      username: video?.ownerInfo?.username
                    }}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-400">Loading videos...</p>
              )}
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

export default WatchVideo;
