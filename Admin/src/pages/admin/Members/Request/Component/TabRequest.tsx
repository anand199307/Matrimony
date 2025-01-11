import React, { useState } from 'react';
import RequestData from './RequestData';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { Text, Cards, AddMemberButton, AddMember } from '../../AllMembers/components/MembersStyled';

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
const TabRequest = ({ currentPage, setCurrentPage }: Props) => {
  const RequestInfo = useAppSelector((state) => state.data.info.requestList);

  const navigate = useNavigate();
  return (
    <div>
      <AddMember>
        <Text>{`We have total ${RequestInfo?.count ? RequestInfo?.count : 0} members`}</Text>
        <Cards>
          <AddMemberButton
            onClick={() => {
              navigate('/add-member');
            }}
          >
            <PlusOutlined />
            Add Members
          </AddMemberButton>
        </Cards>
      </AddMember>

      <RequestData currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default TabRequest;
