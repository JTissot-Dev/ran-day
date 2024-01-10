import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AlertContextProvider } from './contexts/AlertContextProvider'
import { AuthContextProvider } from './contexts/AuthContextProvider'
import router from './router'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AlertContextProvider>
        <RouterProvider router={ router } />
      </AlertContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
