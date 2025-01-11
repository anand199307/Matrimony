import React from 'react';
import { SecurityCodeForm } from '@app/components/auth/SecurityCodeForm/SecurityCodeForm';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const SecurityCodePage: React.FC = () => {
  return (
    <>
      <PageTitle>{'Security Code'}</PageTitle>
      <SecurityCodeForm />
    </>
  );
};

export default SecurityCodePage;
