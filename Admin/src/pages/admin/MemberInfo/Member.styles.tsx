import styled from 'styled-components';
import { Button, Popover, Card } from 'antd';

type Props = {
  status: number;
};
export const Cards = styled(Card)<Props>`
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  margin: 30px 0px;

  .image {
    width: 20%;
    .Title {
      width: 100% !important;
      font-family: Poppins;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px;
      margin: 0px 30px 30px 0px;
    }
    .icons {
      padding: 40px 0px;
      width: 100% !important;
      .verify {
        font-size: 16px;
        font-weight: 500;
        & > div {
          display: flex;
          align-items: center;

          span {
            display: flex;
            align-items: center;
            padding: 80px !important;

            span {
              padding: 80px !important;
            }
          }
        }
      }
    }
  }

  .infoDeatil {
    width: 80%;
    span {
      display: flex;
      h2 {
        display: flex;
        color: #1b1b1b;
        font-family: Poppins;
        font-size: 28px;
        font-style: normal;
        font-weight: 600;
        line-height: 30px;
        align-items: center;
        padding-left: 45px;
        &.span {
          color: blue !important;
          padding-left: 10px;
        }
      }

      span {
        margin-left: 25px;
        padding: 7px 20px;
        border-radius: 5px;
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        background: ${(props) => (props?.status === 0 ? 'red' : ' #65c591')};
      }
    }
  }
`;
export const Viewscope = styled(Button)`
  margin-left: 22%;

  gap: 6px;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  color: #ed1f50;
  border: 2px solid #ed1f50;
  border-color: #ed1f50;
  background: #fff;
  &:hover {
    border-color: #ed1f50 !important;
    color: #ed1f50 !important;
  }
`;

export const StyledDIv = styled.div`
  margin: 40px 40px 0px 40px;
  .wrapper {
    display: flex;
    justify-content: end;
  }
  .content {
    border-radius: 5px;
    background: rgba(237, 31, 80, 0.1);
    width: 795px;
    height: 48px;
    flex-shrink: 0;
    color: #ed1f50;
    font-size: 1em;
    text-align: start;
    padding: 10px;
    font-weight: 600;
    line-height: 28px;
  }
  .print {
    display: flex;
    gap: 30px;
    cursor: pointer;

    & div {
      font-size: 16px;
      font-weight: 500;
      padding-top: 15px !important;
    }
  }
`;
export const StyledPop = styled(Popover)`
  padding: 0.6em;
  display: flex;
  cursor: pointer;

  .iconDisplay {
    margin: 3px 5px 0 0;
  }
`;
export const ActionButton = styled(Button)`
  &.ant-btn {
    border-radius: 5px;
    border: none;
    color: #fff;
    height: 48px;
    font-size: 1em;
    font-weight: 600;
    background: linear-gradient(135deg, #ed1f50 0%, #a31033 100%);
    &:is(:active, :focus, :hover) {
      color: #fff;
      border: none;
      box-shadow: none !important;
    }
  }
`;
export const InfoCenter = styled.div`
  display: grid;
  width: auto;
  line-height: 28px;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px !important;
  color: #4d4d4d;
  justify-content: space-evenly;

  font-size: 40px !important;

  .filed {
    color: #1b1b1b;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    /* line-height: 18px;  */
  }
  .name {
    color: #4d4d4d;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
  }
`;
