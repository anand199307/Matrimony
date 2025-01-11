import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { notificationController } from '@app/controllers/notificationController';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import logo from '@app/assets/icons/admin/rm-Logo.png';
import { ForgotPassword } from '@app/store/slices/authSlice';

interface ForgotPasswordFormData {
  email: string;
}

const initValues = {
  email: '',
};

export const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values: ForgotPasswordFormData) => {
    setLoading(true);
    dispatch(ForgotPassword(values?.email))
      .unwrap()
      .then((res) => {
        notificationController.success({ message: res?.response.data });
        setLoading(false);
        navigate('/auth/login');
      })
      .catch((err) => {
        notificationController.error({ message: err.message });
        setLoading(false);
      });
  };

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initValues}>
        <Auth.BackWrapper onClick={() => navigate(-1)}>
          <Auth.BackIcon />
          {'Back'}
        </Auth.BackWrapper>
        <Auth.FormTitle style={{ marginBottom: '30px' }}>
          <img
            src={logo}
            alt="royal_matrimony"
            style={{ width: '10em', height: '2em', margin: 'auto', objectFit: 'contain' }}
          />
          <div className="title">Reset Password</div>
        </Auth.FormTitle>
        {/* <S.Description>{'forgotPassword.description'}</S.Description> */}
        <Auth.Title>Mail ID</Auth.Title>
        <Auth.FormItem
          name="email"
          rules={[{ required: true, message: 'EmailError' }]}
          style={{ marginBottom: '30px' }}
        >
          <Auth.FormInput placeholder={'Email'} />
        </Auth.FormItem>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton htmlType="submit" loading={isLoading}>
            {'Send Instructions'}
          </Auth.SubmitButton>
        </BaseForm.Item>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
