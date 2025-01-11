import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { ResetPassword, doLogin } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import logo from '@app/assets/icons/admin/rm-Logo.png';
import { Passwordvalidation } from '@app/components/common/forms/ValidationsFile';

interface ResetFormData {
  pwd: string;
  confirmpwd: string;
}

export const initValues: ResetFormData = {
  pwd: '',
  confirmpwd: '',
};

export const Reset: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');

  console.log(token);
  const handleSubmit = (values: ResetFormData) => {
    setLoading(true);
    dispatch(ResetPassword({ token: token, resetData: values }))
      .unwrap()
      .then((res: any) => {
        notificationController.success({ message: res.payload });
        navigate('/auth/login');
        setLoading(false);
      })

      .catch((err: any) => {
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
          <div className="title">Reset Password</div>
        </Auth.FormTitle>

        <Auth.Title>Password</Auth.Title>
        <Auth.FormItem name="pwd" rules={[{ required: true }, { validator: Passwordvalidation }]}>
          <Auth.FormInputPassword placeholder={'password'} />
        </Auth.FormItem>

        <Auth.Title>Confirmation Password</Auth.Title>
        <Auth.FormItem
          name="confirmPwd"
          rules={[
            { required: true, message: 'Please enter your confirm-password' },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!value || getFieldValue('pwd') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('These passwords didn’t match. Try again');
              },
            }),
          ]}
        >
          <Auth.FormInputPassword placeholder={'Confirm password'} />
        </Auth.FormItem>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton htmlType="submit" loading={isLoading}>
            {' Reset Password '}
          </Auth.SubmitButton>
        </BaseForm.Item>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
