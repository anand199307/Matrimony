import React from 'react';
import TableRequest from './TableRequest';
import { useAppSelector } from '@app/hooks/reduxHooks';

export interface requestUser {
  requestId?: string;
  user: {
    _id: string;
    email: string;
    uuid?: string;
    profileId?: string;
  };
  verificationStatus?: string;
  requestType?: string;
  createdAt?: string;
  updatedAt?: string;
}

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
const RequestData = ({ currentPage, setCurrentPage }: Props) => {
  const RequestInfo = useAppSelector((state) => state.data.info.requestList);
  const users = RequestInfo?.data;
  return (
    <div>
      <TableRequest users={users} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default RequestData;
