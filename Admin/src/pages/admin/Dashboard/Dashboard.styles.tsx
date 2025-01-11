import styled, { css } from 'styled-components';
import ReactEcharts from 'echarts-for-react';
import { Button, Card, Table } from 'antd';

interface CardProps {
  name: string;
}
interface buttonProps {
  active: string;
  name: string;
}
interface RelegionProps {
  religionName: string;
}
interface ChartProps {
  chart: string;
}
interface TableProps {
  cardType?: string;
}
export const StyledDiv = styled.div`
  margin: 30px 20px 0px 30px;
  height: auto;
`;

export const Cards = styled(Card)<TableProps>`
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);

  .ant-card-body {
    padding: ${(props) => (props.cardType === 'profiles' ? '0px' : '20px 40px')};
  }
  margin-bottom: 10px;
  border-radius: 10px;
  .mainDiv {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .title {
      color: #1b1b1b;
      font-weight: 600;
      font-size: 1.3em;
    }
  }
  .wrapper {
    display: flex;
    justify-content: space-between;
  }
`;

export const DisplayCard = styled.div<CardProps>`
  display: flex;
  margin: 10px;
  gap: 0px !important;
  border-radius: 10px;
  justify-content: space-evenly;
  background: ${(props) =>
    props?.name === 'All Members'
      ? '#F3FFF7'
      : props?.name === 'Male'
      ? '#FFF7F3'
      : props?.name === 'Female'
      ? '#FAF3FF'
      : '#FFF3F5'};

  width: 100%;

  height: ${(props) =>
    props?.name === 'All Members'
      ? '126px'
      : props?.name === 'Male'
      ? '126px'
      : props?.name === 'Female'
      ? '126px'
      : '126px'};
  .countBox {
    display: flex;
    margin: auto;
    flex-direction: column;
    padding-left: 20px;
    .count {
      font-weight: 600;
      font-size: 2.12em;
    }
    .text {
      color: #4d4d4d;
      font-size: 1em;
      font-weight: 500;
    }
  }
  .icon {
    align-items: center;
    gap: 60px;
    margin: auto;
    padding: 10px;
  }
`;
export const Buttons = styled(Button)<buttonProps>`
  &.ant-btn {
    width: 100px;
    color: #fff;
    text-align: center;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    /* height: 2.25em; */
    border-radius: 10px;
    margin-left: 10px;
    background: ${(props) => (props?.active === props?.name ? '#EE2150' : 'white')};
    color: ${(props) => (props?.active === props?.name ? 'white' : '#a5a5a5')};
    border: ${(props) => (props?.active === props?.name ? 'none' : ' 1px solid #a5a5a5')};
    &:hover {
      color: ${(props) => (props?.active === props?.name ? 'white' : '#a5a5a5')};
      border: ${(props) => (props?.active === props?.name ? 'none' : ' 1px solid #a5a5a5')};
    }
    &:active {
      background: ${(props) => (props?.active === props?.name ? '#EE2150' : 'white')};
      color: ${(props) => (props?.active === props?.name ? 'white' : '#a5a5a5')};
      border: ${(props) => (props?.active === props?.name ? 'none' : ' 1px solid #a5a5a5')};
    }
  }
`;

export const Topbar = styled.div<TableProps>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .graphTitle {
    color: #1b1b1b;
    font-size: 1.3em;
    font-weight: 600;
    margin: ${(props) => (props.cardType === 'profiles' ? '20px 0px 0px 40px ' : '0px')};
  }
  .container {
    display: flex;
    justify-content: space-evenly;
    color: #a3a3a3;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px;
    .Male {
      width: 16px;
      height: 16px;
      border-radius: 50%;

      background-color: #ff957b;
      margin: 3px 12px 0px 0px;
    }
    .Female {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #bf83ff;
      margin: 3px 12px 0px 10px;
    }
  }
`;
export const Echarts = styled(ReactEcharts)<ChartProps>`
  div:nth-child(1) {
    width: 100% !important;

    canvas {
      ${(props) =>
        props?.chart !== 'Pie'
          ? css`
              width: 100% !important;
            `
          : css`
              /* width: 100% !important; */
              height: 300px !important;
              margin-left: -10px !important;
              line-height: 30px !important;
            `}
    }
  }

  ${(props) =>
    props?.chart === 'Pie' &&
    css`
      &:has(canvas:hover) > div:nth-child(2) {
        position: absolute;
        height: auto !important;
        text-align: center;
        padding: 25px 20px !important;
        background: rgba(0, 0, 0, 0.4) !important;
        color: #fff !important;
        box-shadow: none !important;
      }

      &:has(canvas) > div:nth-child(2) {
        display: none;
      }
    `}
  & > div:nth-child(2) {
    border-radius: 10px !important;
    padding: 0 !important;

    border-color: rgba(0, 0, 0, 0.4) !important;
  }

  & > div:nth-child(2) > div {
    background: rgba(0, 0, 0, 0.4);
    padding: 10px !important;
    border-radius: 10px;
    div > span:is(:nth-child(2), :nth-child(3)) {
      color: #fff !important;
    }
    div > span:nth-child(1) {
      border: 1px solid #fff;
    }
  }

  &:has(canvas:hover) > div:nth-child(2) {
    padding: 0 !important;

    div > div > div:nth-child(1) {
      color: #fff !important;
    }
    div > div > div:nth-child(2) > div {
      background-color: transparent !important;

      div > span:nth-child(1) {
        border: 1px solid #fff;
      }

      div > span:is(:nth-child(2), :nth-child(3)) {
        color: #fff !important;
      }
    }
  }
`;
export const Wrapper = styled.div`
  height: 350px;
  overflow: auto;
  ::-webkit-scrollbar {
    height: 0px !important;
    width: 0px !important;
    background-color: transparent !important;
  }
  ::-webkit-scrollbar-thumb {
    display: none !important;
  }
`;
export const Profiletable = styled(Table)`
  padding: 30px 30px 20px 30px;

  .Status {
    color: #fff;
    background: #ff543e;
    border-radius: 0px;
    width: 81px;
    padding: 9px 10px;
  }
  .Verification {
    display: flex;
    width: auto;
    padding: 5px 10px 5px 6px;
    border-radius: 6px;
    border: 1px solid blue;
  }
  .ant-table thead th {
    color: #181818;
    background: #fff;
    font-size: 16px;

    height: 30px;
    margin: 0 !important;
    font-weight: 700;
    border: none;
    border-top: 1px solid #f4f4f5;
    border-bottom: 1px solid #f4f4f5;
  }
  .ant-table-tbody tr {
    color: #4d4d4d;
    font-weight: 600;
    font-size: 15px;
  }
  .ant-table-content {
    overflow: hidden;
  }
  .ant-table {
    width: 100%;
    padding: 0 !important;
    ::-webkit-scrollbar-thumb {
    }

    .ant-table-thead > tr > td {
      display: none;
    }
    .ant-table-thead > tr:has(:last-child) > th::before {
      background-color: #fff !important;
    }
    .ant-table-thead > tr:has(:last-child) > th::before {
    }
    ::-webkit-scrollbar-thumb {
      display: none;
    }

    ::-webkit-scrollbar {
      height: 8px;
    }
  }

  table > tbody > .ant-table-row > td {
    background-color: white;
    margin-bottom: 30px;
    border: none;
  }

  table > tbody > .ant-table-row:nth-child(2n):is(:hover, :not(:hover)) > td {
    background-color: #f8f8f8 !important;
  }
  table > tbody > .ant-table-row:hover {
    background-color: none !important;
  }

  table > tbody > .ant-table-row:hover > td {
    background-color: transparent !important;
  }
  table > tbody > .ant-table-row:nth-child(1) > td {
    display: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  .ant-table-tbody > tr:nth-child(1) > td {
    padding: 0 !important;
  }
  .ant-table-tbody > tr > td {
    padding: 16px 0 16px 16px !important;
    /* padding: 0 !important; */
  }
  .ant-table-thead > tr > th {
    padding: 16px 0 16px 16px !important;
  }
`;

export const Revenuedata = styled.div`
  margin-top: 30px;

  .wrapper {
    display: flex;

    align-items: space-between;
    .icontext {
      display: flex;
      margin-bottom: 30px;
      .text {
        margin: 10px 0px 0px 10px;
        font-size: 1em;
        font-weight: 600;
        color: #4d4d4d;
      }
    }
    .count {
      text-align: end;
      margin-top: 3px;
      color: #4d4d4d;
      font-size: 1.5em;
      font-weight: 600;
    }
  }
`;
export const ReligionData = styled.div`
  width: 280px;
  margin: auto;
  display: flex;
  height: auto;
  flex-wrap: wrap;
  margin-top: 5px;
  justify-content: center;
  .span {
    width: 100%;
    margin: 0px 10px 10px 0;
    color: #4d4d4d;
    font-size: 14px;
    font-family: poppenis;
    font-weight: 600;
    font-style: normal;
  }
`;
export const Span = styled.span<RelegionProps>`
  width: 11px;
  height: 9px;
  border-radius: 50%;
  background-color: ${(props) =>
    props?.religionName === 'Hindu'
      ? '#3289E7'
      : props?.religionName === 'Christian'
      ? '#FF957B'
      : props?.religionName === 'Muslim'
      ? '#65C591'
      : props?.religionName === 'Bhudism'
      ? '#BF83FF'
      : '#FFD57E'};

  margin: 6px 3px 0px 0px;
`;
