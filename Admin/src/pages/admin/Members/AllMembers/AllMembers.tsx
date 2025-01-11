import React, { useState, useEffect } from 'react';
import AddMembers from './components/AddMembers';
import MemberTable from './components/MemberTable';
import { Members } from './components/MembersStyled';
import { UsersInfo } from '@app/store/slices/settingSlice';
import { useAppDispatch } from '@app/hooks/reduxHooks';

const AllMembers: React.FC = () => {
  const [selected, setSelected] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const status = selectedName === 'Active' ? 1 : selectedName === 'In Active' ? 0 : -1;
    dispatch(UsersInfo({ filter: selected ? status : undefined, page: currentPage }));
  }, [dispatch, selectedName, selected, currentPage]);
  return (
    <div>
      <Members>
        <AddMembers setSelectedName={setSelectedName} setSelected={setSelected} selected={selected} />
        <MemberTable setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </Members>
    </div>
  );
};

export default AllMembers;
