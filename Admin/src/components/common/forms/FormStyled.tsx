import styled, { css } from 'styled-components';
import { Card, Upload } from 'antd';
import { Input, Select, Radio, Button } from 'antd';

interface InputProps {
  filed: any;
}
export const Info = styled.h1`
  width: 100%;
  color: #1b1b1b;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  padding: 20px 0px 12px 40px;
`;
export const PassButton = styled(Button)`
  &.ant-btn {
    background: linear-gradient(135deg, #ed1f50 0%, #a31033 100%);
    color: #fff;
    font-size: 13px;
    font-size: 500;
    height: 34px;
    &:active,
    &:focus,
    &:hover {
      color: #fff;
      border-color: none !important;
      border: none !important;
    }
  }
`;

export const Cards = styled(Card)`
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  margin: 0 20px;
  padding: 40px;
  line-height: 18px;
  width: auto;
  .ant-card-body {
    padding: 0px;
  }

  .Mcode {
    border: 1px solid #d9d9d9;
    height: 40px;
    border-radius: 10px;
    padding: 10px 15px;
    color: #d9d9d9;
  }
  .name {
    width: 240px;
    height: 18px;
    color: #4d4d4d;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
  }
`;
export const InputConfirmPassword = styled(Input.Password)`
  height: 40px;
  font-size: 15px;
  font-weight: 500;
  font-family: Poppins;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  outline: none !important;
  padding: 4px 4px 4px 11px !important;

  #password::placeholder,
  #password_confirmation::placeholder {
    color: #999999;
  }

  & {
    border-color: #d9d9d9 !important;
    box-shadow: none !important;
  }

  .ant-input-suffix > span {
    color: #999999;
    font-size: 18px !important;
  }

  & > span > span > button:hover {
    color: #fff !important;
    border-color: none !important;
  }
`;
export const FormInputPassword = styled(Input)`
  height: 40px;
  font-size: 15px;
  font-weight: 500;
  font-family: Poppins;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  outline: none !important;
  padding: 4px 4px 4px 11px !important;

  #password::placeholder,
  #password_confirmation::placeholder {
    color: #999999;
  }

  & {
    border-color: #d9d9d9 !important;
    box-shadow: none !important;
  }

  .ant-input-suffix > span {
    color: #999999;
    font-size: 18px !important;
  }

  & > span > span > button:hover {
    color: #fff !important;
    border-color: none !important;
  }
`;
export const Inputbox = styled(Input)<InputProps>`
  height: 40px;
  color: black;
  width: ${(props) => (props?.filed === 'Annual Income' ? '80%' : '100%')};
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  outline: none !important;
  &:hover::before {
    background-color: gray;
  }
  &:hover {
    color: black;
  }

  &:hover,
  &:active {
    border-color: #d9d9d9 !important;
  }
  &:focus {
    border-color: #d9d9d9 !important;
    box-shadow: none !important;
  }

  margin-left: ${(props) => (props?.name === 'Mobile Number' ? '10px' : 'none')};
  ${(props) =>
    props?.filed === 'Mobile Number' &&
    css`
      width: 87% !important;
      color: red;
      margin-left: 10px;
    `};

  & > span > button {
    border-radius: 5px;
    background: linear-gradient(#ed1f50 100%, #a31033 100%);
    border: none !important;

    &:hover {
      color: black !important;
      border: none !important;
    }
    &:focus {
      border-color: #d9d9d9 !important;
    }
  }
`;

export const Selectoption = styled(Select)`
  .ant-select .ant-select-dropdown {
    ::-webkit-scrollbar {
      display: none;
      width: 0;
    }
  }
  .ant-select-selector {
    height: 40px !important;

    color: black;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    border-radius: 7px;
    outline: none !important;
    padding: 5px 10px !important;

    &:hover::before {
      background-color: gray;
    }
    &:hover {
      color: black;
    }

    &:hover,
    &:active {
      border-color: #d9d9d9 !important;
    }
    &:focus {
      border: none;
      border-color: #d9d9d9 !important;
      box-shadow: none !important;
    }

    &::placeholder {
      color: #f00 !important;
    }

    &:has(.ant-form-item.ant-form-item-success) {
    }
  }
`;

export const RadioButtons = styled(Radio)`
  .ant-radio-checked .ant-radio-inner:checked {
    border-color: red !important ;
    width: Fixed (1, 590px);
    height: Hug (372px);
    padding: 20px 0px 20px 0px;
    border-radius: 10px;
    gap: 10px;
    font-family: poppins;
  }

  .ant-radio-checked .ant-radio-inner {
    background-color: #ed1f50;
    padding: 0;
    border-color: #ed1f50;
  }

  .ant-radio:hover .ant-radio-inner {
    border-color: #ed1f50;
  }
`;

export const MemberButton = styled.div`
  display: flex;
  justify-content: end;
  padding-bottom: 50px;
`;
export const Add = styled(Button)`
  &.ant-btn {
    background-color: #ed1f50;
    color: white;
    display: flex;
    margin: 30px 20px 0px 0px;
    padding: 20px 20px;
    align-items: center;
    border-radius: 5px;
    outline: none !important;
    &:hover::before {
      background-color: #ed1f50;
    }
    &:hover {
      color: Black;
    }

    &:hover {
      color: white !important;
      border: 1px solid #ed1f50;
    }
  }
`;
export const CancelButton = styled(Button)`
  &.ant-btn {
    display: flex;
    color: black;
    width: 168px;
    height: 48px;
    margin: 30px 20px 0px 20px;
    background: transparent;
    box-shadow: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    border: none;
    font-size: 16px;
    outline: none !important;
    &:hover::before {
      border: none;
    }
    &:hover {
      color: black;
    }

    &:hover,
    &:focus,
    &:active {
      border: none;
    }
  }
`;
export const Uploader = styled(Upload)`
  .ant-upload {
    height: 40px;
    width: 100%;
  }

  .ant-upload:hover,
  .ant-upload:focus,
  .ant-upload:active {
    border: none !important;
  }
`;
export const Uploaderi = styled(Upload)`
  .ant-button {
    width: 50px;
    height: 100%;
    padding: 5px 20px 5px 0px;
    cursor: pointer;
  }
`;

export const Roy = styled.div`
  display: flex;
  input[type='file'] {
    display: none;
  }
  width: 100px;
  height: 80px;
  margin: auto;
  display: grid;
  place-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  color: #4d4d4d;
  margin-top: -30px;
`;
export const Profile = styled.div`
  display: flex;
  z-index: 999;
  position: relative;
  input[type='file'] {
    display: none;
  }
  width: 80px;
  height: 70px;
  margin: auto;
  display: grid;
  place-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  color: #4d4d4d;
`;
