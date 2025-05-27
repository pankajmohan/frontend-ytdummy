import React, { useState } from 'react';
import Input from '../components/Input';
import FileInput from '../components/FileInput';
import Button from '../components/Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import Logo from '../components/Logo/Logo';
import api from '../api/axios'

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const registerUser = async (data) => {
    setError('');
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      if (data.avatar) formData.append('avatar', data.avatar);
      if (data.coverImage) formData.append('coverImage', data.coverImage);

      const response = await api.post('/v1/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Success - navigate or handle login
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="bg-gray-900 w-screen h-screen flex items-center justify-center">
      <div className="bg-gray-950 border border-gray-600 rounded-lg w-[800px] p-6 flex flex-row">
        {/* Left Side – Info */}
        <div className="w-1/2 flex flex-col justify-center items-center text-white p-4 border-r border-gray-70 gap-1.5">
         <h2 className="text-xl font-bold mb-4 text-center" style={{margin:0}}>Welcome!<br /> to </h2>
                    <Logo />
          <p className="text-sm text-gray-300 text-center">
            Register to access all features. Upload your avatar and cover image.
          </p>
          <p className="text-sm text-gray-300 text-center mt-6">
            Already a User? <NavLink to={"/login"} className={"text-purple-500 italic"}>Please click here to login</NavLink>
          </p>
        </div>

        {/* Right Side – Form */}
        <div className="w-1/2 flex flex-col items-center px-4">
          {/* <h2 className="text-lg text-white font-bold mb-4">Register</h2> */}
          <form
            onSubmit={handleSubmit(registerUser)}
            className="w-full flex flex-col gap-3"
          >
            <Input
              label="Full name"
              placeholder="Full name"

              {...register('fullName', { required: 'Full name is required' })}
              error={errors.fullName?.message}
            />

            <Input
              label="Username"
              placeholder="Username"

              {...register('username', { required: 'Username is required' })}
              error={errors.username?.message}
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
              placeholder="password"

              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
            />

            <Controller
              name="avatar"
              control={control}
              rules={{ required: 'Avatar is required' }}
              render={({ field }) => (
                <FileInput
                  label="Avatar"
                  onChange={field.onChange}
                  error={errors.avatar?.message}

                />
              )}
            />

            <Controller
              name="coverImage"
              control={control}
              render={({ field }) => (
                <FileInput
                  label="Cover Image"
                  onChange={field.onChange}
                  error={errors.coverImage?.message}

                />
              )}
            />

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>

          {error && (
            <p className="text-red-600 mt-4 text-center text-sm">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
