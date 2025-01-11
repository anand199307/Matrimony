import React from 'react';
import { Reset } from '@app/components/auth/ResetPassword/Reset';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const ResetPassword: React.FC = () => {
  return (
    <>
      <PageTitle>{'NewPassword'}</PageTitle>
      <Reset />
    </>
  );
};

export default ResetPassword;
