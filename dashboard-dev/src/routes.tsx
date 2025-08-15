import React from 'react';
import { type Proffesion } from './types/new-types';
import {
  MdHome,
  MdPerson,
  MdEdit,
  // MdAnalytics,
  MdCode,
  MdAssistant,
  MdSettings,
  MdTask,
  MdPanTool,
  MdTextFormat,
} from 'react-icons/md';

//base routes (auth)
const loginRoutes = [
  {
    name: 'Sign In',
    layout: '/dashboard',
    path: '',
    icon: <MdHome className="h-6 w-6" />,
  },
];

//proffesion specific routes
const getProfessionRoutes = (profession: Proffesion) => {
  const baseRoutes = [
    {
      name: 'Dashboard',
      layout: `/dashboard/${profession}`,
      path: '',
      icon: <MdHome className="h-6 w-6" />,
    },
    {
      name: 'Profile',
      layout: `/dashboard/${profession}`,
      path: 'profile',
      icon: <MdPerson className="h-6 w-6" />,
    },
    {
      name: 'Assistant',
      layout: `/dashboard/${profession}`,
      path: 'ai-assistant',
      icon: <MdAssistant className="h-6 w-6" />,
    },
    {
      name: 'Settings',
      layout: `/dashboard/${profession}`,
      path: 'settings',
      icon: <MdSettings className="h-6 w-6" />,
    },
  ];

  const professionSpecificRoutes = {
    copywriter: [
      {
        name: 'Content projects',
        layout: `/dashboard/${profession}`,
        path: 'projects/content-projects',
        icon: <MdTextFormat className="h-6 w-6" />,
      },
      {
        name: 'Tools',
        layout: `/dashboard/${profession}`,
        path: 'tools',
        icon: <MdPanTool className="h-6 w-6" />,
      },
      {
        name: 'Tasks',
        layout: `/dashboard/${profession}`,
        path: 'tasks',
        icon: <MdTask className="h-6 w-6" />,
      },
      {
        name: 'Clients',
        layout: `/dashboard/${profession}`,
        path: 'clients',
        icon: <MdPerson className="h-6 w-6" />,
      },
    ],
    programmer: [
      {
        name: 'Code projects',
        layout: `/dashboard/${profession}`,
        path: 'projects/code-projects',
        icon: <MdCode className="h-6 w-6" />,
      },
      {
        name: 'Tools',
        layout: `/dashboard/${profession}`,
        path: 'tools',
        icon: <MdPanTool className="h-6 w-6" />,
      },
      {
        name: 'Tasks',
        layout: `/dashboard/${profession}`,
        path: 'tasks',
        icon: <MdTask className="h-6 w-6" />,
      },
      {
        name: 'Clients',
        layout: `/dashboard/${profession}`,
        path: 'clients',
        icon: <MdPerson className="h-6 w-6" />,
      },
    ],
  };

  return [...baseRoutes, ...professionSpecificRoutes[profession]];
};

const routes = loginRoutes;

export { getProfessionRoutes };

export default routes;
