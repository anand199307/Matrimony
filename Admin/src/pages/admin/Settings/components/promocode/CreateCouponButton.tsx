import React from 'react';
import {
  ImgSize,
  ButtonCoupon,
  CardCoupon,
  DeviceText,
  CouponInput,
  CouponSSelect,
  CodeText,
  StarColor,
  StyledForm,
  DatepickerCard,
  CardUploader,
  CheckBoxCard,
  TimePickerCard,
} from '../SettingStyled';
import { Select, Divider, Form } from 'antd';

interface ButtonProps {
  setAddCupon: (value: boolean) => void;
}

const CreateCouponButton: React.FC<ButtonProps> = ({ setAddCupon }) => {
  const { Option } = Select;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1>Create Coupon </h1>
          <ImgSize>Lorem ipsum dolor sit amet consectetur.</ImgSize>
        </div>
        <div>
          <ButtonCoupon
            onClick={() => {
              setAddCupon(false);
            }}
          >
            <h1>Create coupon</h1>
          </ButtonCoupon>
        </div>
      </div>
      <StyledForm>
        <div>
          <DeviceText>
            Coupon Code <StarColor>*</StarColor>
          </DeviceText>
          <Form.Item name="couponcode" rules={[{ required: true, message: 'Please Enter coupon code' }]}>
            <CouponInput placeholder="Enter coupon code" />
            <CodeText>Generate Code</CodeText>
          </Form.Item>
        </div>
        <div>
          <DeviceText>
            User Per Customer <StarColor>*</StarColor>
          </DeviceText>
          <Form.Item name="userpercustomer" rules={[{ required: true, message: 'Please select Uses Per Customer" ' }]}>
            <CouponSSelect placeholder="Select Uses Per Customer">
              <Option value="Option 1">Admin</Option>
              <Option value="Option 2">Manager</Option>
            </CouponSSelect>
          </Form.Item>
        </div>
        {/* <div>
          <Divider />
        </div> */}

        {/* <h1>Create Details </h1> */}
        <div>
          <DeviceText>
            Coupon type <StarColor>*</StarColor>
          </DeviceText>
          <Form name="">
            <CouponSSelect placeholder="Select Coupon type">
              <Option value="Option 1">Admin</Option>
              <Option value="Option 2">Manager</Option>
            </CouponSSelect>
          </Form>
        </div>
        <div>
          <DeviceText>
            Discount Percentage <StarColor>*</StarColor>
          </DeviceText>
          <CouponInput placeholder="Enter discount percent" />
        </div>
        <div>
          <DeviceText>
            Maximum Discount type <StarColor>*</StarColor>
          </DeviceText>
          <CouponSSelect placeholder="Select Coupon type">
            <Option value="Option 1">Admin</Option>
            <Option value="Option 2">Manager</Option>
          </CouponSSelect>
        </div>
        <div>
          <DeviceText>Coupon Limit</DeviceText>
          <CouponInput placeholder="Enter coupon limit" />
        </div>
        {/* <Divider /> */}

        {/* <h1>Create Validity </h1> */}
        <div>
          <DeviceText>
            From <StarColor>*</StarColor>
          </DeviceText>
          <DatepickerCard />
          <CardUploader>
            <CheckBoxCard />
            <h4>Set Coupon End Date</h4>
          </CardUploader>
        </div>
        <div>
          <DeviceText>
            Time <StarColor>*</StarColor>
          </DeviceText>
          <TimePickerCard />
        </div>
        <div>
          <DeviceText>
            To <StarColor>*</StarColor>
          </DeviceText>
          <Form.Item name="date" rules={[{ required: true, message: 'Please select a date' }]}>
            <DatepickerCard />
          </Form.Item>
        </div>
        <div>
          <DeviceText>
            Time <StarColor>*</StarColor>
          </DeviceText>
          <Form.Item name="time" rules={[{ required: true, message: 'Please select a time' }]}>
            <TimePickerCard />
          </Form.Item>
        </div>
      </StyledForm>
    </div>
  );
};

export default CreateCouponButton;
