import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AlertContextProvider } from './contexts/AlertContextProvider'
import { AuthContextProvider } from './contexts/AuthContextProvider'
import { ProgramContextProvider } from './contexts/ProgramContextProvider'
import router from './router'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AlertContextProvider>
        <ProgramContextProvider>
          <RouterProvider router={ router } />
        </ProgramContextProvider>
      </AlertContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
