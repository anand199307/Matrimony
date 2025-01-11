import React from 'react';
import { AddMemberButton } from '../components/MembersStyled';
import { useNavigate } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const handleformopen = () => {
    navigate('/add-member');
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'right', padding: '20px' }}>
      <AddMemberButton onClick={handleformopen}>Add Members</AddMemberButton>
    </div>
  );
};

export default RegistrationForm;
