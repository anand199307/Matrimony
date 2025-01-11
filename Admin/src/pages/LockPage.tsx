import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { LockForm } from '@app/components/auth/LockForm/LockForm';

const LockPage: React.FC = () => {
  return (
    <>
      <PageTitle>{'Lock'}</PageTitle>
      <LockForm />
    </>
  );
};

export default LockPage;
