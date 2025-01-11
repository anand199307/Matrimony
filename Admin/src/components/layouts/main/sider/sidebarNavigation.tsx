import React from 'react';
import { ReactComponent as DashboardOutlined } from '@app/assets/icons/admin/sideNav/DashboardOutline.svg';
import { ReactComponent as AllMembersIcon } from '@app/assets/icons/admin/sideNav/AllMembers.svg';
import { ReactComponent as MembersIcon } from '@app/assets/icons/admin/sideNav/MembersOutline.svg';
import { ReactComponent as RequestIcon } from '@app/assets/icons/admin/sideNav/Requests.svg';
import { ReactComponent as NotificationIcon } from '@app/assets/icons/admin/sideNav/NotificationOutline.svg';
import { ReactComponent as SettingsIcon } from '@app/assets/icons/admin/sideNav/SettingsOutline.svg';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
  admin?: boolean;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    // TODO use path variable
    url: '/dashboard',
    icon: <DashboardOutlined />,
  },
  {
    title: 'Members',
    key: 'members',
    icon: <MembersIcon />,
    children: [
      {
        title: 'All Members',
        key: 'members-list',
        url: '/members-list',
        icon: <AllMembersIcon />,
      },
      {
        title: 'Request',
        key: 'request',
        url: '/request',
        icon: <RequestIcon />,
      },
    ],
  },
  // {
  //   title: 'Analytics',
  //   key: 'analytics',
  //   icon: <AnalyticIcon />,
  //   url: '/ananlytics',
  // },
  {
    title: 'Notification',
    key: 'notification',
    icon: <NotificationIcon />,
    url: '/notification',
  },
  {
    title: 'Settings',
    key: 'settings',
    icon: <SettingsIcon />,
    url: '/settings',
  },
];
