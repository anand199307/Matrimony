import React, { useEffect } from 'react';
import * as S from './LogoutForm.styles';
import { CloseOutlined } from '@ant-design/icons';
import { doLogout } from '@app/store/slices/authSlice';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { notificationController } from '@app/controllers/notificationController';
import { useNavigate } from 'react-router-dom';

type LogOutProps = {
  openLogout: boolean;
  setOpenLogout: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenPop: React.Dispatch<React.SetStateAction<boolean>>;
};
export const LogoutPoover = (props: LogOutProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    props.setOpenLogout(false);
  };
  useEffect(() => {
    if (props.openLogout) {
      props.setOpenLogout(false);
      props.setOpenPop(false);
    }
  }, [dispatch]);
  const handleLogout = () => {
    dispatch(doLogout())
      .unwrap()
      .then(() => {
        navigate('/auth/login');
      })
      .catch((err) => {
        notificationController.error({ message: err.message });
      });
  };
  return (
    <S.StyledModal
      open={props.openLogout}
      centered
      closeIcon={<CloseOutlined onClick={() => props.setOpenLogout(false)} />}
      footer={
        <div className="spaceFlex">
          <S.CustomCancelButton onClick={handleCancel}>Cancel</S.CustomCancelButton>
          <S.LogoutButton onClick={handleLogout}>Logout</S.LogoutButton>
        </div>
      }
    >
      <S.TextStyle>Do you really want to log out?</S.TextStyle>
    </S.StyledModal>
  );
};
