import { createHashRouter, Navigate } from 'react-router-dom';
import NotFound from '@renderer/pages/not-found';
import Index from '@renderer/pages/index';
import About from '@renderer/pages/about';
import Home from '@renderer/pages/home';
import AgentMattersFour from '@renderer/pages/agent-matters-four';
import AgentMattersList from '@renderer/pages/agent-matters-list';
import Setting from '@renderer/pages/setting';
import Clock from '@renderer/pages/clock';
import WorkBench from '@renderer/pages/work-bench';

// 全局路由
export const globalRouters = createHashRouter([
    {
        path: '/',
        element: <Navigate to="/index/home" />,
    },
    {
        path: '/index',
        element: <Index />,
        children: [
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'agent-matters-four',
                element: <AgentMattersFour />
            },
            {
                path: 'agent-matters-list',
                element: <AgentMattersList />
            },
            {
                path: 'setting',
                element: <Setting />
            },
            {
                path: 'clock',
                element: <Clock />
            },
            {
                path: 'work-bench',
                element: <WorkBench />
            },
            {
                path: '404',
                element: <NotFound />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ]
    },

])