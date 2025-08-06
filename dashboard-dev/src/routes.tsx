import React from 'react';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from 'react-icons/md';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: 'Projects',
    layout: '/admin',
    path: 'projects',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  },
  {
    name: 'Tasks',
    layout: '/admin',
    path: 'tasks',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  },
  {
    name: 'Billings',
    layout: '/admin',
    path: 'billings',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  },
  {
    name: 'AI-Assistant',
    layout: '/admin',
    path: 'ai-assistant',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  },
  {
    name: 'Settings',
    layout: '/admin',
    path: 'settings',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />,
  },
];
export default routes;
