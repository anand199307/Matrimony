import styled from 'styled-components';
import { Button } from 'antd';

export const MainDiv = styled.div`
  color: #ed1f50;
  display: flex;
  font-family: Poppins;
  font-size: 21px;
  font-style: normal;
  font-weight: 500;
  line-height: 38px;
  justify-content: space-between;
`;
export const Main = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  justify-content: space-between;
`;
export const Down = styled(Button)`
  &.ant-btn {
    width: 70px;
    height: 60px;
    border: none;
  }
`;
export const Downsecond = styled(Button)`
  &.ant-btn {
    width: 70px;
    height: 60px;
    border: none;
  }
`;
