import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import api from "../api/axios"
import { login } from '../store/authSlice';
import Loader from '../components/Loader/Loader';
function EditUser({ height = 'auto' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarWidth = useSelector((state) => state.sidebar.width);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const computedWidth = isMobile
    ? '100vw'
    : `calc(100vw - ${sidebarWidth}px)`;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const updateUser = async (data) => {
    setLoading(true)
    setError('');
    try {
      // const formData = new FormData();
      // formData.append('fullName', data.fullName);
      // formData.append('username', data.username);
      // formData.append('email', data.email);
      // formData.append('password', data.password);

      const response = await api.patch('/users/update-account', {
        fullName: data.fullName,
        email: data.email,
        password: data.password
      },);
      localStorage.setItem("auth", JSON.stringify(response.data.data));
      dispatch(login(response.data.data))

      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false)
    }
  };
  const changeAvatar = async (files) => {
    setLoading(true)
    const formData = new FormData();
    try {
      if (files?.[0]) formData.append('avatar', files[0]);
      const response = await api.patch('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      localStorage.setItem("auth", JSON.stringify(response.data.data));
      dispatch(login(response.data.data))

      navigate('/');
    } catch (error) {
      setError(err?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false)
    }




  }

  const changeCoverImage = async (files) => {
    const formData = new FormData();
    try {
      setLoading(true)
      if (files?.[0]) formData.append('coverImage', files[0]);
      const response = await api.patch('/users/cover-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },

      });
      localStorage.setItem("auth", JSON.stringify(response.data.data));
      dispatch(login(response.data.data))

      navigate('/');

    } catch (error) {
      setError(err?.response?.data?.message || 'Something went wrong.');

    } finally {
      setLoading(false)
    }



  }

  return (
    <>
      {loading && <Loader />} {/* 👈 Show loader only during loading */}

    <main
      className="overflow-y-auto min-h-[calc(100vh-5rem)] bg-gray-950 text-white flex justify-center items-center px-4 py-10 mt-20 border border-t-purple-500"
      style={{ width: computedWidth, height }}
    >
      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-purple-400">Edit Your Profile</h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <form
          onSubmit={handleSubmit(updateUser)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input
            label="Full Name"
            placeholder="Full name"
            {...register('fullName', { required: 'Full name is required' })}
            error={errors.fullName?.message}
          />

          <Input
            label="Email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
          />

          {/* Avatar Upload */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-purple-300">Avatar</label>
            <Controller
              name="avatar"
              control={control}
              // rules={{ required: 'Avatar is required' }}
              render={({ field }) => (
                <label className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg cursor-pointer transition">
                  Change Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      changeAvatar(e.target.files);
                    }}
                    className="hidden"
                  />
                </label>
              )}
            />
            {errors.avatar && (
              <p className="text-red-500 text-xs">{errors.avatar.message}</p>
            )}
          </div>

          {/* Cover Image Upload */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-purple-300">Cover Image</label>
            <Controller
              name="coverImage"
              control={control}
              render={({ field }) => (
                <label className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg cursor-pointer transition">
                  Change Cover Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      changeCoverImage(e.target.files);
                    }}
                    className="hidden"
                  />
                </label>
              )}
            />
            {errors.coverImage && (
              <p className="text-red-500 text-xs">{errors.coverImage.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <Button type="submit" className="w-full mt-2">
              Update
            </Button>
          </div>
        </form>
      </div>
    </main>
  </>);
}

export default EditUser;
