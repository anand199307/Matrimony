import { styled } from 'styled-components';

import { Button } from 'antd';

import { Table } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

export const RequestMember = styled.div`
  width: 100%;
  /* height: 100vh; */
  position: relative;
  top: 40px;
`;

export const Buttons = styled(Button)<{ name?: string; value?: string }>`
  && {
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 0;
    margin-right: 20px;
    font-weight: 500;
    font-size: 16px;
    width: 180px;
    height: 46px;
    padding: 0;
    &:hover {
      border: none;
      box-shadow: none;
      color: ${(props) => (props?.name === props?.value ? '#ED1F50' : 'initial')};
      border-bottom: ${(props) => (props?.name === props?.value ? '3px solid #ED1F50' : 'none')};
    }
    border-bottom: ${(props) => (props?.name === props?.value ? '3px solid #ED1F50' : 'none')};
    color: ${(props) => (props?.name === props?.value ? '#ED1F50' : 'initial')};
  }
`;

// Tab Antd

export const TabReq = styled.div`
  padding: 0px 25px;
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const AddMemberButton = styled(Button)`
  &.ant-btn {
    width: 168px;
    height: 48px;
    background: linear-gradient(92.08deg, #ed1f50 0%, #a31033 100%);
    border-radius: 5px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
    &:hover {
      color: #ffffff;
    }
  }
`;

//  Table style

export const StyledTable = styled(Table)`
  width: 100%;
  /* height: 100vh; */
  padding: 18px;

  .ant-table-row:nth-child(2n) {
    background-color: #f8f8f8;
  }

  .ant-pagination {
    display: none;
  }
`;

export const TableCol = styled.div`
  width: 100px;
  display: flex;
`;

export const TableId = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #a31033;
`;

export const PlusIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 10px 10px;
`;

export const TableProperty = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  color: #1b1b1b;
  font-size: 15px;
  line-height: 16px;
  color: #1b1b1b;
`;

export const TableHeading = styled.h1`
  color: #4d4d4d;
  font-family: Poppins;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

export const TableAction = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  color: #1b1b1b;
  font-size: 15px;
  line-height: 16px;
  display: flex;
`;

export const Arrrow = styled(ArrowUpOutlined)`
  width: 10px;
  height: 10px;
  margin-top: 2px;
`;

export const VerticalLine = styled.div`
  width: 20px;
  height: 0px;
  border: 1px solid #d9d9d9;
  transform: rotate(90deg);
  margin-top: 10px;
`;

export const TableIdNumber = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TablePorfile = styled.div``;

export const TableImg = styled.img`
  width: 54px;
  height: 54px;
`;

export const CopyIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const IdImg = styled.img`
  width: 54px;
  height: 54px;
`;

export const CheckSquare = styled.img`
  width: 20px;
  height: 20px;
`;

export const CloseSquare = styled.img`
  width: 20px;
  height: 20px;
`;
