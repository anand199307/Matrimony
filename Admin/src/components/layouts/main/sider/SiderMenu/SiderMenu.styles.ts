import styled from 'styled-components';
import { Menu as AntMenu } from 'antd';
import { FONT_SIZE } from '@app/styles/themes/constants';

type MenuProps = {
  path: any;
};
export const Menu = styled(AntMenu)<MenuProps>`
  background: transparent;
  border-right: 0;
  margin-top: 30px;

  a {
    width: 100%;
    display: block;
  }
  .ant-menu-item {
    height: 3rem;
  }
  .ant-menu-item,
  .ant-menu-submenu {
    font-size: ${FONT_SIZE.xs};
    margin-bottom: 10px !important;
  }

  .ant-menu-item-icon {
    width: 1.25rem;
  }

  .ant-menu-submenu-expand-icon,
  .ant-menu-submenu-arrow,
  span[role='img'],
  a,
  .ant-menu-item {
    color: #fff;
    fill: #fff;
    font-size: 16px;
    font-weight: 600;
  }
  .ant-menu-submenu {
    color: #fff;
    fill: #fff;
    font-size: 16px;
    font-weight: 600;
    background: transparent !important;
    border-left: none !important;
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    .ant-menu-submenu-expand-icon,
    .ant-menu-submenu-arrow,
    span[role='img'],
    a,
    /* .ant-menu-item-icon, */
    .ant-menu-title-content {
      color: #fff;
      fill: #fff;
    }
  }

  .ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      color: #fff;
      border-left: 5px solid #fff;
      background: linear-gradient(135deg, #ed1f50 0%, #a31033 100%) !important;
      border-radius: 0px !important;
      width: 100% !important;
      height: 3rem;

      .ant-menu-submenu-expand-icon,
      .ant-menu-submenu-arrow,
      span[role='img'] {
        color: #fff;
        fill: #fff;
      }
    }
  }

  .ant-menu .ant-menu-item {
    border-radius: none !important;
  }
  .ant-menu-item-selected {
    border-left: ${(props) =>
      props?.path.includes('members-list') ||
      props?.path?.includes('request') ||
      props?.path.includes('add-member') ||
      props?.path.includes('member-info')
        ? 'none'
        : '5px solid #fff'};
    background: ${(props) =>
      props?.path.includes('members-list') ||
      props?.path?.includes('request') ||
      props?.path.includes('add-member') ||
      props?.path.includes('member-info')
        ? 'transparent'
        : 'linear-gradient(135deg, #ed1f50 0%, #a31033 100%)'};
    border-radius: 0px !important;
    width: 100% !important;
    .ant-menu-item-icon,
    .ant-menu-submenu-expand-icon,
    .ant-menu-submenu-arrow,
    span[role='img'],
    a {
      color: #fff;
      fill: #fff;
    }
  }

  .ant-menu-item-active,
  .ant-menu-submenu-active .ant-menu-submenu-title {
    background-color: transparent !important;
  }
`;
