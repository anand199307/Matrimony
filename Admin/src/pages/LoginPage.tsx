import React from 'react';
import { LoginForm } from '@app/components/auth/LoginForm/LoginForm';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const LoginPage: React.FC = () => {
  return (
    <>
      <PageTitle>{'login'}</PageTitle>
      <LoginForm />
    </>
  );
};

export default LoginPage;
