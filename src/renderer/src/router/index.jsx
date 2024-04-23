import { createHashRouter, Navigate } from 'react-router-dom'
import NotFound from '@renderer/pages/not-found'
import Index from '@renderer/pages/index'
import About from '@renderer/pages/about'

// 全局路由
export const globalRouters = createHashRouter([
    {
        path: '/',
        element: <Navigate to="/index" />,
    },
    {
        path: '/index',
        element: <Index />,
        children: [
            {
                path: 'about',
                element: <About />,
            },
        ]
    },
    {
        path: '/404',
        element: <NotFound />,
    },
    // 未匹配，，跳转Login页面
    {
        path: '*',
        element: <Navigate to="/404" />,
    },
])