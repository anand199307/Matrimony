import React from 'react';
import { Error } from '@app/components/Error/Error';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import error404 from '@app/assets/images/error404.svg';

const Error404Page: React.FC = () => {
  return (
    <>
      <PageTitle>{'ClientError'}</PageTitle>
      <Error img={error404} msg={'error404.notFound'} />
    </>
  );
};

export default Error404Page;
