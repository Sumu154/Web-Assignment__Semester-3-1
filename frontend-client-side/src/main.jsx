import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import router from './routes/router.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import LoadingProvider from './contexts/LoadingProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider> <AuthProvider> 
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider> </LoadingProvider>
  </StrictMode>,
)
