import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import store from "./store/store.js"
import { Provider } from 'react-redux'
import AuthLayout from './components/Auth/AuthLayout.jsx'
import NotFound from './components/ErrorBoundary/NotFound.jsx'



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
      </Route>
       <Route path="*" element={<NotFound />} />
    </>
  )
);


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </StrictMode>,
)


