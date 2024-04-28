import { RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { globalRouters } from '@renderer/router/index'
import '@renderer/assets/styles/normalize.css';
import '@renderer/assets/styles/scroll.scss';
import './style.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={globalRouters} />
  </React.StrictMode>
)
