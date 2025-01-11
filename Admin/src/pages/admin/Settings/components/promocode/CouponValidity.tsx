import React from 'react';
import {
  DeviceText,
  DatepickerCard,
  TimePickerCard,
  CardCoupon,
  CheckBoxCard,
  CardUploader,
  StarColor,
  StyledForm,
} from '../SettingStyled';
import { Divider, Form } from 'antd';

const CouponValidity: React.FC = () => {
  return (
    <div>
      <h1>Create Validity </h1>
      <StyledForm>
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
      <Divider />
    </div>
  );
};

export default CouponValidity;
