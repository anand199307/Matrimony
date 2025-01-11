import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as S from './SiderMenu.styles';
import { sidebarNavigation, SidebarNavigationItem } from '../sidebarNavigation';
import { Menu, Badge } from 'antd';
import { useAppSelector } from '@app/hooks/reduxHooks';

interface SiderContentProps {
  setCollapsed: (isCollapsed: boolean) => void;
}

const sidebarNavFlat = sidebarNavigation.reduce(
  (result: SidebarNavigationItem[], current) =>
    result.concat(current.children && current.children.length > 0 ? current.children : current),
  [],
);

const SiderMenu: React.FC<SiderContentProps> = ({ setCollapsed }) => {
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const currentMenuItem = sidebarNavFlat.find(({ url }) => url === location.pathname);
    //console.log(currentMenuItem);
    const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : ['add-member'];

    setSelectedKeys(defaultSelectedKeys);
  }, [location.pathname]);

  const path = window.location.pathname?.split('/');
  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    setCollapsed(true);
  };
  const count = useAppSelector((state) => state.notification.info.notifcationCount);

  return (
    <S.Menu mode="inline" path={path} selectedKeys={selectedKeys} onClick={handleMenuClick}>
      {sidebarNavigation.map((nav) =>
        nav.children && nav.children.length > 0 ? (
          <Menu.SubMenu
            key={nav.key}
            title={nav.title}
            icon={nav.icon}
            onTitleClick={() => setCollapsed(false)}
            popupClassName="d-none"
          >
            {nav.children.map((childNav) => (
              <Menu.Item key={childNav.key} title="" icon={childNav.icon}>
                <Link to={childNav.url || ''}>{childNav.title}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={nav.key} title="" icon={nav.icon}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to={nav.url || ''}>{nav.title}</Link>
              {nav.title === 'Notification' && (
                <div style={{ paddingRight: '1px' }}>
                  <Badge count={count} overflowCount={8} style={{ border: '1px solid white' }} />
                </div>
              )}
            </div>
          </Menu.Item>
        ),
      )}
    </S.Menu>
  );
};

export default SiderMenu;
