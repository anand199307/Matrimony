import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doLogin } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import logo from '@app/assets/icons/admin/rm-Logo.png';

interface LoginFormData {
  email: string;
  password: string;
}

export const initValues: LoginFormData = {
  email: '',
  password: '',
};

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = (values: LoginFormData) => {
    setLoading(true);
    dispatch(doLogin(values))
      .unwrap()
      .then(() => {
        navigate('/dashboard');
        setLoading(false);
      })

      .catch((err) => {
        notificationController.error({ message: err.message });
        setLoading(false);
      });
  };

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initValues}>
        <Auth.FormTitle>
          <img
            src={logo}
            alt="royal_matrimony"
            style={{ width: ' 137px', height: '70px', margin: '0px auto', objectFit: 'contain' }}
          />
          <div className="title">Login</div>
        </Auth.FormTitle>
        <Auth.Title>Mail ID</Auth.Title>
        <Auth.FormItem
          name="email"
          //label={'Mail Id'}
          rules={[
            { required: true, message: 'RequiredField' },
            {
              type: 'email',
              message: 'NotValidEmail',
            },
          ]}
        >
          <Auth.FormInput placeholder={'admin mail ID'} />
        </Auth.FormItem>
        <Auth.Title>Password</Auth.Title>
        <Auth.FormItem name="password" rules={[{ required: true, message: 'RequiredField' }]}>
          <Auth.FormInputPassword placeholder={'password'} />
        </Auth.FormItem>

        <Auth.resetContainer onClick={() => navigate('/auth/forgot-password')}>
          <span>Reset Password</span>
        </Auth.resetContainer>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton htmlType="submit" loading={isLoading}>
            {' Login '}
          </Auth.SubmitButton>
        </BaseForm.Item>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
