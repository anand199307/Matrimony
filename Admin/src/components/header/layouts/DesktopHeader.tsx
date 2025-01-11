import React from 'react';
import SearchBox from './SearchBox';
import Profile from './Profile';
import ToggleComponent from './ToggleComponent';
import { Header } from './HeaderStyled';

export const DesktopHeader: React.FC = () => {
  const path = window.location.pathname?.split('/');
  return (
    <Header>
      <ToggleComponent />
      {(path.includes('notification') ||
        path.includes('settings') ||
        path.includes('request') ||
        path.includes('members-list')) && <SearchBox />}
      <Profile />
    </Header>
  );
};
