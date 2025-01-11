import React from 'react';
import { ManaageTeam } from '../SettingStyled';
import InviteTeam from './InviteTeam';
import ListTable from './ListTable';

const TeamManage: React.FC = () => {
  return (
    <ManaageTeam>
      <InviteTeam />
      <ListTable />
    </ManaageTeam>
  );
};

export default TeamManage;
