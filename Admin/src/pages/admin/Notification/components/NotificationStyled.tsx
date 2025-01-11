import { styled } from 'styled-components';
import { Table } from 'antd';
import { Checkbox } from 'antd';
import { ArrowUpOutlined, MinusSquareOutlined } from '@ant-design/icons';
// import { table } from 'console';

export const Container = styled.div`
  width: 100%;
  position: relative;
  top: 40px;
`;

export const Article = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 25px;
`;

export const Text = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
`;

export const Card = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 97px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  margin-right: 25px;
`;

export const Filters = styled.img`
  width: 16px;
  height: 16px;
`;

export const FilterText = styled.span`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #4d4d4d;
`;

//  Table style

export const StyledTable = styled(Table)`
  width: 100%;
  padding: 25px;

  .ant-table-row:nth-child(2n) {
    background-color: #f8f8f8;
  }
  .ant-table-row:hover > td {
    background-color: transparent !important;
  }
  .ant-pagination {
    display: none;
  }
`;

export const TableCol = styled.div`
  display: flex;
  width: 200px;
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
  /* width: 280px;
  height: 74px; */
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  color: #1b1b1b;
`;

export const TableName = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  color: #1b1b1b;
`;

export const TableMessage = styled.h1`
  width: 450px;
`;

export const TableHeading = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 16px;
  color: #4d4d4d;
`;

export const TableAction = styled.h1`
  /* width: 220px; */
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  color: #1b1b1b;
  font-size: 15px;
  line-height: 16px;
  display: flex;
  justify-content: space-between;
`;

export const Arrrow = styled(ArrowUpOutlined)`
  width: 10px;
  height: 10px;
`;

export const SuccessIcon = styled.img`
  width: 16x;
  height: 16px;
`;

export const PendingIcon = styled.img`
  width: 16x;
  height: 16px;
`;

export const PrintIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const DeleteIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const MinusSquare = styled(MinusSquareOutlined)`
  color: red;
`;

export const CheckSquare = styled(Checkbox)`
  color: red;

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: red;
    border-color: red;
  }
`;
