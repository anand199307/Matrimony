import styled from 'styled-components';
import { Modal, Button } from 'antd';

export const TextStyle = styled('div')`
  font-size: 16px;
  color: black;
  font-weight: 700;
  margin: 26px 0 36px 110px;
`;
export const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 480px !important;
    height: 220px !important;
    border-radius: 20px !important;
  }
  .ant-modal-footer {
    border: none;
  }
  .spaceFlex {
    display: flex;
    justify-content: space-between;
  }
`;
export const CustomCancelButton = styled(Button)`
  &.ant-btn {
    margin-left: 25px;
    width: 168px;
    height: 51px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    background-color: transparent;
    color: rgba(0, 0, 0, 0.4);
    &:focus,
    &:hover {
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      background-color: transparent;
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;
export const LogoutButton = styled(Button)`
  &.ant-btn {
    width: 171px;
    height: 51px;
    margin-right: 25px;
    border-radius: 10px;
    font-weight: 600;
    background: linear-gradient(135deg, #ed1f50 0%, #a31033 100%);
    color: #fff;
    &:hover,
    &:active {
      border: none;
      color: #fff;
    }
  }
`;
