import { RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { globalRouters } from '@renderer/router/index'
import '@renderer/assets/styles/normalize.css';
import '@renderer/assets/styles/scroll.scss';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider componentSize='small'>
      <RouterProvider router={globalRouters} />
    </ConfigProvider>
  </React.StrictMode>
)
