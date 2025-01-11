import styled, { css } from 'styled-components';
import { Button, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { media } from '@app/styles/themes/constants';
import { LAYOUT } from '@app/styles/themes/constants';

export const Sider = styled(Layout.Sider)`
  position: fixed;
  overflow: visible;
  right: 0;
  z-index: 5;
  min-height: 100vh;
  max-height: 100vh;
  background: #121314 !important;
  box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.1);

  color: var(--text-secondary-color);

  @media only screen and (${media.md}) {
    right: unset;
    left: 0;
  }

  @media only screen and (${media.xl}) {
    position: unset;
  }
`;

export const CollapseButton = styled(Button)<{ $isCollapsed: boolean }>`
  background: #fff;

  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  position: absolute;
  right: 0.5rem;

  ${(props) =>
    props.$isCollapsed &&
    css`
      right: -1rem;
    `}

  color: var(--text-secondary-color);

  &:hover {
    color: var(--text-secondary-color);
    background: var(--primary-color);
    border: 1px solid var(--border-color);
  }

  &:focus {
    color: var(--text-secondary-color);
    background: var(--primary-color);
    border: 1px solid var(--border-color);
  }
`;

export const SiderContent = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - ${LAYOUT.mobile.headerHeight});

  @media only screen and (${media.md}) {
    max-height: calc(100vh - ${LAYOUT.desktop.headerHeight});
  }
`;

export const SiderLogoLink = styled(Link)`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

export const SiderLogoDiv = styled.div`
  height: ${LAYOUT.mobile.headerHeight};
  padding: ${LAYOUT.mobile.headerPadding};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (${media.md}) {
    height: ${LAYOUT.desktop.headerHeight};
    padding-top: ${LAYOUT.desktop.paddingVertical};
    padding-bottom: ${LAYOUT.desktop.paddingVertical};
  }
`;

export const BrandSpan = styled.span`
  margin: 0 1rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--white);
`;
export const LogoutWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 30px;
  .marginLeftForLogout {
    margin-right: 1rem;
    margin-left: 1rem;
  }
  .accountButton {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;
export const LogoutButton = styled(Button)`
  background-color: transparent;
  color: white;
  border: none;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    color: var(--text-secondary-color);
    background: transparent;
    border: none;
  }
  &:hover {
    color: var(--text-secondary-color);
    background: transparent;
    border: none;
  }
`;
