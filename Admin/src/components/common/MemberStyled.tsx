import styled from 'styled-components';
import { Card } from 'antd';
export const Cards = styled(Card)`
  /* margin-top: 100px; */
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  margin: 20 20px;
  padding: 40px;
  line-height: 18px;
  width: auto;
  .ant-card-body {
    padding: 0px;
  }

  .name {
    width: 240px;
    height: 18px;

    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: #4d4d4d;

    padding: 10px;
  }
`;
