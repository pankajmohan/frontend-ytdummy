import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import EditUser from './pages/EditUser.jsx'
import Home from './pages/Home.jsx'
import store from "./store/store.js"
import { Provider, useSelector } from 'react-redux'
import AuthLayout from './components/Auth/AuthLayout.jsx'
import NotFound from './components/ErrorBoundary/NotFound.jsx'
import MyContent from './pages/MyContent.jsx'
import WatchVideo from './pages/VideoToWatch.jsx'
import LikedVideos from './pages/LikedVideos.jsx'
import WatchHistory from './pages/WatchHistory.jsx'
import Subscribers from './pages/Subscribers.jsx'
import { Toaster } from 'react-hot-toast';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      } />

      <Route path='/register' element={
        <AuthLayout authentication={false}>
          <SignUp />
        </AuthLayout>
      } />

      <Route path='/' element={<Layout />}>
        <Route index element={
          <AuthLayout authentication={true}>
            <Home />
          </AuthLayout>
        } />
        <Route path="/my-content/:username" element={
          <AuthLayout authentication={true}>
            <MyContent />
          </AuthLayout>
        } />
        <Route path="/my-liked-videos" element={
          <AuthLayout authentication={true}>
            <LikedVideos />
          </AuthLayout>
        } />
        <Route path="/my-watched-videos" element={
          <AuthLayout authentication={true}>
            <WatchHistory />
          </AuthLayout>
        } />
        <Route path='/edit-user' element={
          <AuthLayout authentication={true}>
            <EditUser />
          </AuthLayout>
        } />  
        
        <Route path='/subscribers/:userId' element={
          <AuthLayout authentication={true}>
            <Subscribers />
          </AuthLayout>
        } />    
        <Route path='/watch-video/:videoId' element={
          <AuthLayout authentication={true}>
            <WatchVideo />
          </AuthLayout>
        } />
      </Route>
       <Route path="*" element={<NotFound />} />
    </>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
   </StrictMode>,
)


