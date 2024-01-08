import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout'
import './index.css'
import { AlertContextProvider } from './contexts/AlertContextProvider'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlertContextProvider>
      <Layout />
    </AlertContextProvider>
  </React.StrictMode>,
)
