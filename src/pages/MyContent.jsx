import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CoverImage from '../components/CoverImage';
import Button from '../components/Button'
import UserChannelData from '../components/UserChannelData/UserChannelData';
import ChannelContentVideo from '../components/ChannelContentVideo/ChannelContentVideo';
import DialogWrapper from '../components/Dialog/DialogWrapper'
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/Input';
import FileInput from '../components/FileInput'
import api from '../api/axios'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../components/Loader/Loader"; // import loader
import toast from 'react-hot-toast'; // 👈 Add this import


function MyContent() {
  const authuser = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true); // 👈 loading state

  const { username } = useParams()
  const [open, setOpen] = useState(false);

  // const [isOwner, setIsOwner] = useState(false);
  const [user, setUser] = useState({
    avatar: "",
    fullName: "",
    username: "",
    coverImage: "",
    isSubscribed: "",
    channelsSubscribedToCount: "",
    subscribersCount: "",
    isOwnChannel: ""
  });
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [myVideos, setMyVideos] = useState([]);
  async function myVideoData() {
    setLoading(true); // start loading

    try {
      const response = await api.get(`/users/c/${username}`);
      setMyVideos(response.data.data.videos);
      setUser(response.data.data)
      // if(username == authuser.username) setIsOwner(true);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error(err?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false)

    }
  }

  useEffect(() => {
    myVideoData();
  }, [username]);


  const onSubmit = async (data) => {
    setLoading(true)
setOpen(false);
    setError('');
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('tags', data.tags);
      if (data.newVideo) formData.append('newVideo', data.newVideo);
      if (data.thumbnail) formData.append('thumbnail', data.thumbnail);

      const response = await api.post('/videos/new-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('🎉 Video uploaded successfully!');
      setOpen(false); // close the upload modal
      await myVideoData(); // refresh video list
    } catch (err) {
      setOpen(true)
      setError(err?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }

  }
  const coverImage = user.coverImage?.replace("/upload", "/upload/w_1280,h_720,c_fill,g_auto,f_auto,q_auto,r_12/")
  return (
    <>
      {loading && <Loader />} {/* 👈 Show loader only during loading */}

      <main className="mt-16 overflow-y-auto h-[calc(100vh-5rem)] bg-gray-950 text-white border border-t-purple-500">
        <CoverImage src={coverImage} alt="Cover" height="16rem" />
        <div className="px-4 pb-4">
          <UserChannelData user={user} setOpen={setOpen} setUser={setUser} />
          {/* <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
          <li className="w-full">
            <Button className="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">Videos</Button>
          </li>
          <li className="w-full">
            <Button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">Playlist</Button>
          </li>
          <li className="w-full"><Button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">Tweets</Button></li>
          <li className="w-full"><Button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">Subscribed</Button></li>
        </ul> */}
          <ChannelContentVideo setOpen={setOpen} myVideos={myVideos} setMyVideos={setMyVideos} userinfo={{ avatar: user.avatar, username: user.username, isOwner: user?.isOwnChannel }} />
          <DialogWrapper
            open={open}
            setOpen={setOpen}
            title="Upload new video"
          // trigger={<Button>Upload</Button>}
          >
            <form className="space-y-4 flex flex-col " onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="text"
                placeholder="Title"
                {...register("title", { required: "Title is required" })}
                inputType="Input"
                label={"Title:"}
                error={errors.title?.message}

              />
              <Input
                placeholder="Description"
                {...register("description", { required: "Description is required" })}
                inputType="Textarea"
                label={"Description:"}
                error={errors.description?.message}


              />
              <Controller
                name="newVideo"
                control={control}
                rules={{ required: 'Video is required' }}
                render={({ field }) => (
                  <FileInput
                    type="file"
                    label={"Video:"}
                    onChange={field.onChange}
                    error={errors.newVideo?.message}
                    accept="video/mp4,video/webm,video/ogg,video/avi,video/quicktime,video/x-flv,video/mpeg,video/3gpp,video/x-ms-wmv"
                  />
                )}
              />
              <Controller
                name="thumbnail"
                control={control}
                rules={{ required: 'Thumbnail is required' }}
                render={({ field }) => (
                  <FileInput
                    type="file"
                    label={"Thumbnail:"}
                    onChange={field.onChange}
                    error={errors.thumbnail?.message}
                    accept="image/jpeg,image/png,image/gif,image/bmp,image/tiff,image/webp,image/heic,image/svg+xml"

                  />
                )}
              />
              <Input
                placeholder="Tags"
                {...register("tags", { required: "tags are required" })}
                inputType="Input"
                label={"Tags:"}
                error={errors.tags?.message}


              />
              <Button
                type="submit"
                className="">Upload
              </Button>

            </form>
            {error && (
              <p className="text-red-600 mt-4 text-center text-sm">{error}</p>
            )}

          </DialogWrapper>


        </div>

      </main>
    </>);

}

export default MyContent;
