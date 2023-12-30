import { CssBaseline } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './Styles/styles.scss'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer></ToastContainer>
    <CssBaseline />
  </React.StrictMode>,
)
