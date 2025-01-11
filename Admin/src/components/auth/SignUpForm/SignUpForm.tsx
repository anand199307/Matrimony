import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doSignUp } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import { ReactComponent as GoogleIcon } from '@app/assets/icons/google.svg';
import { ReactComponent as FacebookIcon } from '@app/assets/icons/facebook.svg';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from './SignUpForm.styles';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  termOfUse: true,
};

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = (values: SignUpFormData) => {
    setLoading(true);
    dispatch(doSignUp(values))
      .unwrap()
      .then(() => {
        notificationController.success({
          message: t('auth.signUpSuccessMessage'),
          description: t('auth.signUpSuccessDescription'),
        });
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
        <S.Title>{'SignUp'}</S.Title>
        <Auth.FormItem name="firstName" label={'FirstName'} rules={[{ required: true, message: 'RequiredField' }]}>
          <Auth.FormInput placeholder={'FirstName'} />
        </Auth.FormItem>
        <Auth.FormItem name="lastName" label={'LastName'} rules={[{ required: true, message: 'RequiredField' }]}>
          <Auth.FormInput placeholder={'LastName'} />
        </Auth.FormItem>
        <Auth.FormItem
          name="email"
          label={'Email'}
          rules={[
            { required: true, message: 'RequiredField' },
            {
              type: 'email',
              message: 'NotValidEmail',
            },
          ]}
        >
          <Auth.FormInput placeholder={'email'} />
        </Auth.FormItem>
        <Auth.FormItem label={'Password'} name="password" rules={[{ required: true, message: 'RequiredField' }]}>
          <Auth.FormInputPassword placeholder={'Password'} />
        </Auth.FormItem>
        <Auth.FormItem
          label={'ConfirmPassword'}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'RequiredField' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('ConfirmPasswordError'));
              },
            }),
          ]}
        >
          <Auth.FormInputPassword placeholder={'ConfirmPassword'} />
        </Auth.FormItem>
        <Auth.ActionsWrapper>
          <BaseForm.Item name="termOfUse" valuePropName="checked" noStyle>
            <Auth.FormCheckbox>
              <Auth.Text>
                {'signup to agree our'}{' '}
                <Link to="/" target={'_blank'}>
                  <Auth.LinkText>{'termOfUse'}</Auth.LinkText>
                </Link>{' '}
                and{' '}
                <Link to="/" target={'_blank'}>
                  <Auth.LinkText>{t('privacyOPolicy')}</Auth.LinkText>
                </Link>
              </Auth.Text>
            </Auth.FormCheckbox>
          </BaseForm.Item>
        </Auth.ActionsWrapper>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
            {'SignUp'}
          </Auth.SubmitButton>
        </BaseForm.Item>
        <BaseForm.Item noStyle>
          <Auth.SocialButton type="default" htmlType="submit">
            <Auth.SocialIconWrapper>
              <GoogleIcon />
            </Auth.SocialIconWrapper>
            {'signup with google'}
          </Auth.SocialButton>
        </BaseForm.Item>
        <BaseForm.Item noStyle>
          <Auth.SocialButton type="default" htmlType="submit">
            <Auth.SocialIconWrapper>
              <FacebookIcon />
            </Auth.SocialIconWrapper>
            {'signup with facebook'}
          </Auth.SocialButton>
        </BaseForm.Item>
        <Auth.FooterWrapper>
          <Auth.Text>
            {'signup already ?'}{' '}
            <Link to="/auth/login">
              <Auth.LinkText>{'here'}</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
