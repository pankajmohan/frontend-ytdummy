import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
function Login() {

  

  return (
    <div className="bg-gray-900 w-screen h-screen flex items-center justify-center">
      <div className="bg-gray-950 border border-gray-700 rounded-lg w-full max-w-4xl mx-auto p-6 flex flex-col md:flex-row">

        {/* Left Side – Info */}
        <div className="md:w-1/2 flex flex-col justify-center items-center text-white p-4 border-b md:border-b-0 md:border-r border-gray-700 gap-1.5">

          <h2 className="text-xl font-bold mb-4 text-center" style={{margin:0}}>Welcome!<br /> to </h2>
                    <Logo />
          
        </div>

        {/* Right Side – Form */}
        <div className="md:w-1/2 flex flex-col items-center px-4 pt-6 md:pt-0">
          <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p><NavLink to={"/"} className={"text-purple-500"}>Please click here to go back to home</NavLink></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
