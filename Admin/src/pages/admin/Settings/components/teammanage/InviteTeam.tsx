import React from 'react';
import { DeviceText, InviteButton, StarColor, StyledForm, CouponInput, CouponSSelect } from '../SettingStyled';
import { Select, Divider, Form } from 'antd';
import MailIcon from '../../../../../assets/Mail.png';
import { notificationController } from '@app/controllers/notificationController';
import { InviteAdmin } from '@app/store/slices/settingSlice';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { MobileNumberValidate } from '@app/components/common/forms/ValidationsFile';

interface inviteData {
  email: string;
  role: string;
}

export const initValues: inviteData = {
  email: '',
  role: '',
};

const InviteTeam: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const onfinish = (value: any) => {
    if (value?.role === 'admin') {
      dispatch(InviteAdmin(value))
        .then((res: any) => {
          notificationController.success({ message: res.payload });
          form.resetFields();
        })

        .catch((err: any) => {
          notificationController.error({ message: err.message });
        });
    }
  };

  return (
    <div>
      <h1>Invite your team members</h1>
      {/* <ImgSize>Lorem ipsum dolor sit amet consectetur </ImgSize> */}
      <StyledForm onFinish={onfinish} form={form}>
        <div>
          <DeviceText>
            Email Address <StarColor>*</StarColor>
          </DeviceText>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'RequiredField' },
              {
                type: 'email',
                message: 'Enter valid email',
              },
            ]}
          >
            <CouponInput placeholder="Enter plan name" style={{ width: '90%' }} />
          </Form.Item>
        </div>
        <div>
          <DeviceText>
            Role<StarColor>*</StarColor>
          </DeviceText>
          <Form.Item name="role" rules={[{ required: true, message: 'Please select role ' }]} initialValue="admin">
            <CouponSSelect defaultValue="admin" placeholder="Select plan type" style={{ width: '90%' }}>
              <Select value="admin">Admin</Select>
              {/* /<Select value="manager">Manager</Select> */}
            </CouponSSelect>
          </Form.Item>
        </div>
        <div>
          <DeviceText>
            Mobile Number<StarColor>*</StarColor>
          </DeviceText>
          <Form.Item name="mobileNumber" rules={[{ required: true }, { validator: MobileNumberValidate }]}>
            <CouponInput placeholder="Enter plan Mobile number" style={{ width: '90%' }} />
          </Form.Item>
        </div>
        <InviteButton htmlType="submit">
          <img src={MailIcon} alt="" />
          Send Invite
        </InviteButton>
      </StyledForm>

      <Divider />
    </div>
  );
};

export default InviteTeam;
