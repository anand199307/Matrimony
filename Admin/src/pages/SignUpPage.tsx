import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { SignUpForm } from '@app/components/auth/SignUpForm/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <>
      <PageTitle>{'SignUp'}</PageTitle>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
