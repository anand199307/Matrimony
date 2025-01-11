import styled from 'styled-components';
import { Select, Input, DatePicker, TimePicker, Upload, Button, Checkbox, Card, Radio, Form, Table } from 'antd';
import { ArrowUpOutlined, MinusSquareOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';

export const Container = styled.div`
  background: #fff;
  background: transparent;
  border: 1px solid #e4e9eb;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 58px;
  padding: 0px 5px;
  margin: 50px 0px 0px 35px;
  border-radius: 10px;
  z-index: 1;
  position: static;
`;

export const Control = styled(Button)<{ name?: string; value?: string }>`
  && {
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 10px;
    font-weight: 500;
    font-size: 16px;
    width: 160px;
    height: 48px;
    padding: 0;
    &:hover {
      border: none;
      box-shadow: none;
      color: ${(props) => (props?.name === props?.value ? '#FFFFFF' : 'initial')};
      border: ${(props) => (props?.name === props?.value ? '3px solid #ED1F50' : 'none')};
    }
    background: ${(props) =>
      props?.name === props?.value ? 'linear-gradient(90deg, #EE2150 0%, #A31033 79.68%);' : 'none'};
    color: ${(props) => (props?.name === props?.value ? '#FFFFFF' : 'initial')};
  }
`;

export const ControlTheme = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

export const ControlCard = styled(Card)`
  width: 300px;
  /* height: 436px; */
  /* height: 262px; */
  height: 170px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  margin: 25px 0px 0px 40px;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Favicon = styled.p`
  width: 300px;
  height: 48px;
  background: linear-gradient(90deg, rgba(238, 33, 80, 0.2) 0%, rgba(163, 16, 51, 0.2) 79.68%);
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ee2150;
  border-left: 6px solid #ee2150;
`;

export const ControlText = styled.a<{ name?: string; value?: string }>`
  && {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    padding-left: 10px;
    line-height: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    height: 48px;
    margin-top: 10px;

    border: none;
    box-shadow: none;
    color: ${(props) => (props?.name === props?.value ? '#ee2150' : 'initial')};
    border-left: ${(props) => (props?.name === props?.value ? '6px solid #ED1F50' : 'none')};
    background: ${(props) =>
      props?.name === props?.value
        ? 'linear-gradient(90deg, rgba(238, 33, 80, 0.2) 0%, rgba(163, 16, 51, 0.2) 79.68%)'
        : 'none'} !important;
    background: ${(props) => (props?.name === props?.value ? '#ffffff' : 'none')};
    color: ${(props) => (props?.name === props?.value ? '#4d4d4d' : 'initial')};
  }
`;

export const WebsiteLogoCard = styled(Card)`
  width: 740px;
  height: 314px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  margin: 25px 0px 0px 40px;
`;

export const UploadIcon = styled(Upload)`
  &.hover,
  :focus {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }
`;

export const Updated = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const UploaderButton = styled(Button)`
  width: 80px;
  height: 80px;
  border: 1px dashed #a5a5a5;
  border-radius: 10px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #a5a5a5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UpdateLogo = styled.button`
  width: 140px;
  height: 44px;
  background: #f8f8f8;
  border-radius: 10px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #4d4d4d;
  border: none;
  margin-left: 20px;
  margin-top: 10px;
`;

export const UpdateBox = styled(Button)`
  &.ant-btn {
    width: 140px;
    height: 44px;
    background: #f8f8f8;
    border-radius: 10px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #4d4d4d;
    border: none;
    margin-top: 25px;
    &:hover {
      border: none;
      color: black;
    }
  }
`;

export const CardUploader = styled.div`
  display: flex;
`;

export const ImgSize = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #a5a5a5;
  margin-top: 8px;
  margin-bottom: 20px;
`;

export const LogoDesign = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 10px;
`;

export const CardColor = styled.img`
  width: 325px;
  height: 45px;
  margin-right: 50px;
`;

// HeroSection

export const SectionCard = styled(Card)`
  width: 740px;
  height: 554px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  margin: 25px 0px 0px 40px;
`;

export const DesktopUploader = styled(Button)`
  &.ant-btn {
    width: 260px;
    height: 80px;
    object-fit: cover;
    border: 1px dashed #d9d9d9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    input[type='file'] {
      display: none;
    }
    &:hover,
    :focus {
      border: 1px dashed #d9d9d9;
      /* color: black; */
    }
  }
`;

export const MobileUplader = styled(Button)`
  &.ant-btn {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border: 1px dashed #d9d9d9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    input[type='file'] {
      display: none;
    }
    &:hover,
    :focus {
      border: 1px dashed #d9d9d9;
      /* color: black; */
    }
  }
`;

export const IconDelete = styled(CloseOutlined)`
  position: absolute;
  right: 30%;
  bottom: 80%;
  cursor: pointer;
`;

export const StyledUploader = styled(Upload)`
  width: 260px !important;
  height: 80px !important;
  border-radius: 10px !important;
  border: 1px dashed #d9d9d9;
`;

export const UploadImg = styled.img`
  width: 60px;
  height: 60px;
`;

export const DeviceText = styled.h4`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #121314;
  margin: 15px 0px;
`;

export const FormText = styled.h4`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #121314;
  margin-bottom: 5px;
`;

export const Textlink = styled.h4`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #121314;
  margin: 25px 20px;
`;

export const Boxlink = styled.div`
  width: 251px;
  height: 38px;
  border: 1px solid #e4e9eb;
  border-radius: 10px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #a5a5a5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

export const BannerBox = styled(Input)`
  && {
    width: 700px;
    height: 60px;
    background: #ffffff;
    border: 1px solid #e4e9eb;
    border-radius: 10px;
    &:focus,
    &:hover {
      border-color: 1px solid #e4e9eb;
      box-shadow: none;
    }
  }
`;

export const SectionAbout = styled(Card)`
  width: 740px;
  height: 440px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  margin: 25px 0px 0px 40px;
`;

export const AboutBox = styled(Input)`
  && {
    width: 700px;
    height: 84px;
    border: 1px solid #e4e9eb;
    border-radius: 10px;
    padding: 10px;
    margin-top: 15px;
    &:focus,
    &:hover {
      border-color: 1px solid #e4e9eb;
      box-shadow: none;
    }
  }
`;

export const StoriesSuccess = styled(Card)`
  width: 740px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  margin: 25px 0px 0px 40px;
  overflow-y: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PlusBox = styled(Button)`
  &.ant-btn {
    width: 44px;
    height: 44px;
    border: 1px solid #e4e9eb;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: black;
      border: 1px solid #e4e9eb;
    }
  }
`;

export const SuccessCard = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  gap: 10px;
`;

export const PreviewCard = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  gap: 10px;
`;

export const StoryCard = styled(Input)`
  && {
    width: 230px;
    height: 44px;
    border: 1px solid #e4e9eb;
    border-radius: 10px;
    margin-left: 20px;
    margin-top: 15px;
    &:focus,
    &:hover {
      border-color: 1px solid #e4e9eb;
      box-shadow: none;
    }
  }
`;

export const SectionFeature = styled(Card)`
  width: 740px;
  height: 670px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  margin: 25px 0px 0px 40px;
`;

export const FeatureCard = styled.div`
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardFeature = styled(Input)`
  && {
    width: 330px;
    height: 40px;
    border: 1px solid #e4e9eb;
    border-radius: 10px;
    margin-bottom: 20px;
    margin-left: 20px;
    &:focus,
    &:hover {
      border-color: 1px solid #e4e9eb;
      box-shadow: none;
    }
  }
`;

export const CardPlan = styled(Input)`
  && {
    width: 330px;
    height: 40px;
    border: 1px solid #e4e9eb;
    border-radius: 10px;
    &:focus,
    &:hover {
      border-color: 1px solid #e4e9eb;
      box-shadow: none;
    }
  }
`;

export const DesCard = styled(Input)`
  && {
    width: 330px;
    height: 40px;
    border: 1px solid #e4e9eb;
    box-shadow: 0px 4px 14px rgba(79, 92, 128, 0.06);
    border-radius: 10px;
    margin-bottom: 20px;
    font-family: 'Poppins';
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    &:focus,
    &:hover {
      border-color: 1px solid #e4e9eb;
      box-shadow: none;
    }
  }
`;

export const CardQque = styled.div`
  width: 500px;
  height: 50px;
  border: 1px solid #e4e9eb;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0px 4px 14px rgba(79, 92, 128, 0.1);
`;

export const CardAns = styled(Card)`
  width: 500px;
  height: auto;
  box-shadow: 0px 4px 14px rgba(79, 92, 128, 0.1);
  /* border: 1px solid #e4e9eb; */
  border-radius: 10px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #a5a5a5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CardQA = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const PlanPrice = styled(Card)`
  width: 740px;
  height: 360px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  margin: 25px 0px 0px 40px;
`;

export const FaqCard = styled(Card)`
  width: 740px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  margin: 25px 0px 200px 40px;
  overflow-y: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PromoCard = styled(Card)`
  width: 83%;
  margin: 25px 0px 0px 35px;
`;

export const CouponCard = styled(Card)`
  width: 65%;
  height: 100%;
  border-radius: 20px;
  margin: 25px 0px 0px 35px;
`;

export const PlanCard = styled(Card)`
  width: 65%;
  height: 723px;
  border-radius: 20px;
  margin: 25px 0px 0px 35px;
`;

export const PromoButton = styled(Button)`
  &.ant-btn {
    width: 160px;
    height: 46px;
    border-radius: 10px;
    color: #ee2150;
    border: 2px solid var(--primery-color, #ee2150);
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    &:hover {
      color: #ee2150;
      border: 2px solid var(--primery-color, #ee2150);
    }
  }
`;

export const AddButton = styled(Button)`
  &.ant-btn {
    width: 122px;
    height: 46px;
    border-radius: 10px;
    color: #ee2150;
    border: 2px solid var(--primery-color, #ee2150);
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    &:hover {
      color: #ee2150;
      border: 2px solid var(--primery-color, #ee2150);
    }
  }
`;

//  Table promo code

export const StyledTable = styled(Table)`
  width: 100%;
  .ant-table-row:nth-child(2n) {
    background-color: #f8f8f8;
  }
`;

export const TableCol = styled.div`
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
  display: flex;
  align-items: start;
  justify-content: start;
`;

export const TablePromo = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  color: #1b1b1b;
  font-size: 15px;
  line-height: 16px;
`;

export const TableSuccess = styled.h1`
  width: 108px;
  height: 26px;
  border: 1px solid #65c591;
  border-radius: 6px;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  color: #1b1b1b;
  font-size: 14px;
  line-height: 16px;
  color: #1b1b1b;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const TablePending = styled.h1`
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
  width: 106px;
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
  width: 106px;
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
  font-size: 15px;
  line-height: 16px;
  color: #4d4d4d;
  display: flex;
  gap: 3px;
  text-align: center;
`;

export const TableAction = styled.h1`
  /* width: 160px; */
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
  margin-top: 3px;
  cursor: pointer;
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
  cursor: pointer;
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

export const CheckSquare = styled(Checkbox)`
  color: red;

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: red;
    border-color: red;
  }
`;

//  ManaageTeam styled components CSS

export const ManaageTeam = styled(Card)`
  width: 80%;
  height: auto;
  margin: 25px 0px 0px 40px;
  background: #ffffff;
`;

export const TeamCard = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const EmailInput = styled(Input)`
  && {
    width: 100%;
    height: 40px;
    background: #ffffff;
    border-radius: 10px;
    &:focus,
    &:hover {
      border-color: 1px solid #e4e9eb;
      box-shadow: none;
    }
  }
`;

export const SelectRole = styled(Select)`
  && {
    width: 30%;
    background: #ffffff;
    & > div {
      height: 40px !important;
      border-radius: 10px !important;
    }
  }
`;

export const InviteButton = styled(Button)`
  &.ant-btn {
    width: 130px;
    height: 46px;
    border-radius: 10px;
    font-size: 16px;
    color: #ee2150;
    border: 2px solid var(--primery-color, #ee2150);
    gap: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 15px;
    cursor: pointer;
    &:hover {
      color: #ee2150;
      border: 2px solid #ee2150;
    }
  }
`;
export const FeatureButton = styled(Button)`
  &.ant-btn {
    background: linear-gradient(90deg, #ee2150 0%, #a31033 79.68%);
    color: white;
    cursor: pointer;
    &:hover,
    :focus {
      border: none;
      border: 2px solid #ee2150;
    }
  }
`;

//  invite table

export const InviteTable = styled(Table)`
  width: 100%;
  overflow-y: scroll;
  .ant-table-row:nth-child(2n) {
    background-color: #f8f8f8;
  }
  .ant-table-thead tr:last-child {
    margin-right: 20px;
    color: red !important;
  }
  .ant-pagination {
    display: none;
  }
  .table {
    align-items: center;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }
`;

export const SelectBox = styled.div`
  width: 145px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  text-align: center;
  padding-top: 7px;
  height: 34px !important;
  border-radius: 9px !important;
`;

export const TableRole = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  color: #1b1b1b;
  font-size: 15px;
  line-height: 16px;
  display: flex;
  justify-content: space-around;
`;

export const Tablelock = styled.span`
  width: 145px;
  height: 34px;
  border: 1px solid #e4e9eb;
  border-radius: 9px;
  background: #ffffff;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  color: #1b1b1b;
  font-size: 15px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 30px;
`;

// Create Coupon

export const CouponInput = styled(Input)`
  && {
    width: 97%;
    height: 40px;
    border: 1px solid #e4e9eb;
    border-radius: 10px;
    background: #ffffff;
    &:focus,
    &:hover {
      border-color: 1px solid #e4e9eb;
      box-shadow: none;
    }
  }
`;

export const FeatureInput = styled(Input)`
  && {
    width: 97%;
    height: 40px;
    border: 1px solid #e4e9eb;
    border-radius: 10px;
    background: #ffffff;
    &:focus,
    &:hover {
      border-color: 1px solid #e4e9eb;
      box-shadow: none;
    }
  }
`;

export const StarColor = styled.span`
  color: red;
`;

export const ButtonCoupon = styled(Button)`
  &.ant-btn {
    width: 160px;
    height: 46px;
    border-radius: 10px;
    color: #e4e9eb;
    background: linear-gradient(90deg, #ee2150 0%, #a31033 79.68%);
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    &:hover {
      color: #fff;
      border: none;
    }
  }
`;

export const AddCoupon = styled(Button)`
  &.ant-btn {
    width: 122px;
    height: 46px;
    border-radius: 10px;
    color: #e4e9eb;
    background: linear-gradient(90deg, #ee2150 0%, #a31033 79.68%);
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    &:hover {
      color: #fff;
      border: none;
    }
  }
`;

export const RadioBox = styled(Radio)`
  .ant-radio-checked .ant-radio-inner {
    background-color: red;
    border-color: red;
    margin-left: 10px;
  }
`;

export const CodeText = styled.h4`
  color: #ee2150;
`;

export const CardCoupon = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
`;

export const PlanOffer = styled.div`
  /* width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); */
  display: flex;
  /* flex: auto; */
  /* align-items: center; */
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
`;

export const ValidityCard = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const DatepickerCard = styled(DatePicker)`
  width: 97%;
  height: 40px;
  border-radius: 10px;
  background: #ffffff;
  margin-bottom: 10px;
`;

export const TimePickerCard = styled(TimePicker)`
  width: 40%;
  height: 40px;
  border-radius: 10px;
  background: #ffffff;
`;

export const CouponSSelect = styled(Select)`
  width: 97%;
  background: #ffffff;
  & > div {
    height: 40px !important;
    border-radius: 10px !important;
  }
`;

export const CheckBoxCard = styled(Checkbox)`
  /* color: red; */
  margin-right: 10px;

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: red;
    border-color: red;
  }
`;

export const ValidCard = styled.div`
  display: flex;
  margin: 25px 0px;
`;

export const VerticleScroll = styled.div`
  max-height: 80vh;
  overflow-y: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const AddPlanCard = styled(Card)`
  width: 96%;
  margin: 25px 0px 0px 35px;
`;
