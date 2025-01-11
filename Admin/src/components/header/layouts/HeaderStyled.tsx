import { styled } from 'styled-components';
import { BellFilled } from '@ant-design/icons';
import { Input, Badge, Popover } from 'antd';

// Header

export const Header = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

// Text

export const Thing = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #1b1b1b;
  display: flex;
  @media (max-width: 768px) {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }
`;

// Profile

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 768px) {
    margin-left: 15px;
  }
`;

// Create a vertical line
export const VerticalLine = styled.div`
  width: 40px;
  height: 0px;
  border: 1px solid #dddddd;
  transform: rotate(90deg);
  background-color: #999;
  /* transform: translateY(5px); */
`;

// Create a profile image
export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

// Create a name label
export const NameLabel = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  color: #1b1b1b;
  margin-left: 20px;
  @media (max-width: 768px) {
    font-size: 18px;
    margin-left: 10px;
  }
`;

// Create a notification count badge

export const Dropdown = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 20px;
  @media (max-width: 768px) {
    margin-left: 10px;
  }
`;

// SearchBox

export const SearchContainer = styled.div`
  border: 1px solid #e4e9eb;
  display: flex;
  border-radius: 10px;
  .searchIcon {
    padding: 13px 0px 0px 20px;
  }
`;

// Create a styled input component
export const InputBox = styled(Input)`
  && {
    padding: 20px;
    font-size: 16px;
    border: none;
    background: #ffffff;
    border: none;
    border-radius: 10px;
    width: 540px;
    height: 48px;
    &:focus,
    &:hover {
      border: none;
      box-shadow: none;
    }
    &::placeholder {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #a5a5a5;
      //padding-left: 30px;
    }
  }
  @media (max-width: 768px) {
    padding: 20px 20px;
    font-size: 16px;
    border: none;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    width: 300px;
    height: 48px;
  }
`;

// Create a styled search icon component
export const SearchIcon = styled.img`
  position: absolute;
  /* top: 3%; */
  transform: translateX(-240px);
  color: #999;
  width: 20px;
  height: 20px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    position: absolute;
    top: 3%;
    transform: translateX(-130px);
    color: #999;
    width: 20px;
    height: 20px;
    z-index: 1;
  }
`;

export const BellIconWithBadge = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const BellIcon = styled(BellFilled)`
  font-size: 20px;
  color: #000;
`;

export const BadgeCount = styled(Badge)`
  position: relative;
  bottom: 15px;
  right: 5px;
`;

export const CustomPopover = styled(Popover)`
  .ant-popover-inner {
    margin: 250px !important;
  }
`;
export const LogoutCard = styled.div`
  width: 240px;
  height: 106px;
`;

export const CardBar = styled.div`
  font-weight: 500;
  font-size: 16px;
  padding: 10px;
  display: flex;
  cursor: pointer;
`;
