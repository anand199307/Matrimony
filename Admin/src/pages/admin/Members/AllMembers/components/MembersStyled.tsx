import { styled, css } from 'styled-components';
import { Button, Table } from 'antd';
import { Checkbox, Popover } from 'antd';
import { ArrowUpOutlined, MinusSquareOutlined } from '@ant-design/icons';
// import { table } from 'console';

type checkedProps = {
  checkedprop: boolean;
};
export const Members = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  top: 40px;
`;

export const AddMember = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
`;

export const Text = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  color: #000000;
`;

export const Filters = styled.img`
  width: 16px;
  height: 16px;
`;
export const StyledPop = styled(Popover)`
  width: 150px;
  padding: 10px;
  display: flex;
  cursor: pointer;
  padding-left: 50px;
  font-size: 14px;
  font-weight: 400;
`;
export const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 97px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  margin-right: 25px;
  cursor: pointer;
`;

export const AddMemberButton = styled(Button)`
  &.ant-btn {
    width: 168px;
    height: 48px;
    background: linear-gradient(92.08deg, #ed1f50 0%, #a31033 100%);
    border-radius: 5px;

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
      color: white;
      border: 2px solid var(--primery-color, #ee2150);
    }
  }
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
  padding: 18px;

  .ant-table-row:nth-child(2n) {
    background-color: #f8f8f8;
  }

  .ant-table-row:hover > td {
    background-color: transparent !important;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }
`;

export const TableCol = styled.div`
  display: flex;
`;

export const TableId = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #a31033;
  margin-top: 5px;
`;

export const PlusIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 10px 10px;
`;

export const TableProperty = styled.h1`
  /* width: 5.5rem; */
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  color: #1b1b1b;
  font-size: 15px;
  line-height: 16px;
  color: #1b1b1b;
  display: flex;
  flex-direction: row;
`;
export const TablePending = styled.h1`
  width: 108px;
  height: 26px;
  border: 1px solid #65c591;
  border-radius: 6px;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #1b1b1b;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const TableSuccess = styled.h1`
  width: 108px;
  height: 26px;
  border: 1px solid #ff543e;
  border-radius: 6px;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #1b1b1b;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const TableActive = styled.h1`
  width: 81px;
  height: 26px;
  background: #65c591;
  border-radius: 5px;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  color: #ffffff;
`;

export const TableInactive = styled.h1`
  width: 77px;
  height: 26px;
  background: #ff543e;
  border-radius: 5px;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  color: #ffffff;
`;

export const TableSuspended = styled.h1`
  width: 100px;
  height: 26px;
  background: #ffcf6c;
  border-radius: 5px;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  color: #ffffff;
`;

export const TableHeading = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 16px;
  gap: 5px;
  color: #4d4d4d;
  display: flex;
  flex-direction: row;
`;

export const TableAction = styled.h1`
  //width: 8rem;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  color: #1b1b1b;
  font-size: 15px;
  line-height: 16px;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
`;

export const Arrrow = styled(ArrowUpOutlined)`
  width: 10px;
  height: 10px;
  margin-top: 2px;
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

export const Uploader = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const DeleteIcon = styled.img`
  width: 20px;
  height: 20px;
  color: black;
`;

export const EyeIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const VerticalLine = styled.div`
  width: 20px;
  height: 0px;
  border: 1px solid #d9d9d9;
  transform: rotate(90deg);
  margin-top: 10px;
`;

export const MinusSquare = styled(MinusSquareOutlined)`
  color: red;
`;

export const Check = styled(Checkbox)`
  &:hover {
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #ff0000 !important;
      border-color: #ff0000 !important;
    }
  }
  .ant-checkbox .ant-checkbox-inner {
    width: 18px !important;
    height: 18px !important;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: red;
    border-color: red;
    width: 18px !important;
    height: 18px !important;
  }
  .ant-checkbox {
    &:hover {
      .ant-checkbox-inner {
        border: 1px solid #d9d9d9 !important;
      }
    }
  }
`;
export const CheckSquare = styled(Checkbox)<checkedProps>`
  .ant-checkbox-checked > .ant-checkbox-inner:hover {
    background-color: #ff0000 !important;
    //border-color: #ff0000 !important;
  }
  &:hover {
    .ant-checkbox-checked > .ant-checkbox-inner {
      background-color: #ff0000 !important;
      //border-color: #ff0000 !important;
    }
  }

  .ant-checkbox {
    &:hover {
      .ant-checkbox-inner {
        border: 1px solid #d9d9d9 !important;
      }
    }
  }

  .ant-checkbox .ant-checkbox-inner {
    background-color: ${(props) => (props?.checkedprop ? 'red !important' : 'none')};
    width: 18px !important;
    height: 18px !important;

    ${(props) =>
      props?.checkedprop &&
      css`
        &::after {
          opacity: 1;
          border-color: white !important;

          transform: rotate(45deg) scale(1) translate(-50%, -50%);
          transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        }
      `};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: red;
    border-color: red;
    width: 18px !important;
    height: 18px !important;
  }
`;
