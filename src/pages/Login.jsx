import React, { useState } from 'react';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from "../store/authSlice";
import api from '../api/axios';
import Logo from '../components/Logo/Logo';
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState();

  const login = async (data) => {
    setError("");
    try {
      const response = await api.post('/users/login', data);
      console.log(response.data.data.user)
                            localStorage.setItem("auth", JSON.stringify(response.data.data.user ));

      dispatch(authLogin(response.data.data.user));

      navigate('/home');
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-gray-900 w-screen h-screen flex items-center justify-center">
      <div className="bg-gray-950 border border-gray-700 rounded-lg w-full max-w-4xl mx-auto p-6 flex flex-col md:flex-row">

        <div className="md:w-1/2 flex flex-col justify-center items-center text-white p-4 border-b md:border-b-0 md:border-r border-gray-700 gap-1.5">

          <h2 className="text-xl font-bold mb-4 text-center" style={{margin:0}}>Welcome!<br /> to </h2>
                    <Logo />
          <p className="text-sm text-gray-300 text-center mt-0.5">
            Login to access all features.<br />
            Not a user yet? <Link to={"/register"} className="text-purple-400 underline">Register here.</Link>
          </p>
        </div>

        <div className="md:w-1/2 flex flex-col items-center px-4 pt-6 md:pt-0">
          <form onSubmit={handleSubmit(login)} className="w-full flex flex-col gap-4">
            <Input
              label="Username"
              placeholder="Username"
              {...register('username', { required: 'Username is required' })}
              error={errors.username?.message}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
            />
            <Button type="submit" className="w-full">
              Login
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

export default Login;
