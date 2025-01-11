import React from 'react';
import { Error } from '@app/components/Error/Error';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import serverError from '@app/assets/images/server-error.svg';

const ServerErrorPage: React.FC = () => {
  return (
    <>
      <PageTitle>{'ServerError'}</PageTitle>
      <Error img={serverError} msg={'serverError'} />
    </>
  );
};

export default ServerErrorPage;
