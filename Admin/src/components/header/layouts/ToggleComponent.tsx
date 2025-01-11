import { useNavigate } from 'react-router-dom';
import { Thing } from './HeaderStyled';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ToggleComponent = () => {
  const path =
    window.location.pathname?.replace('-', ' ').charAt(0).toUpperCase() + window.location.pathname.slice(1).split('/');

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/members-list');
  };
  const formattedString = path
    .slice(1)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div>
      <Thing>
        {formattedString === 'Member Info' || formattedString === 'Add Member' ? (
          <>
            <ArrowLeftOutlined style={{ cursor: 'pointer', width: '30px' }} onClick={handleNavigation} />
            {formattedString}
          </>
        ) : (
          formattedString
        )}
      </Thing>
    </div>
  );
};

export default ToggleComponent;
