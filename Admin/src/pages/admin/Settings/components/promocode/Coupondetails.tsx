import React from 'react';
import { TeamCard, DeviceText, CouponInput, CouponSSelect, StyledForm, StarColor } from '../SettingStyled';
import { Select, Divider, Form } from 'antd';

const Coupondetails: React.FC = () => {
  const { Option } = Select;

  return (
    <div>
      <h1>Coupon Details </h1>
      <StyledForm>
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
      </StyledForm>
      <Divider />
    </div>
  );
};

export default Coupondetails;
