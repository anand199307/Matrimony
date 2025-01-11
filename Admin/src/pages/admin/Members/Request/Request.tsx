import React, { useState, useEffect } from 'react';
import { RequestMember } from './Component/RequestStyled';
import TabRequest from './Component/TabRequest';
import { RequestInfo } from '@app/store/slices/settingSlice';
import { useAppDispatch } from '@app/hooks/reduxHooks';

const Request: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(RequestInfo());
  }, []);

  return (
    <div>
      <RequestMember>
        <TabRequest currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </RequestMember>
    </div>
  );
};

export default Request;
