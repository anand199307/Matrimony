import React, { useState, useEffect } from 'react';
import dropdown from '../../../assets/dropdown.png';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import {
  IconContainer,
  VerticalLine,
  ProfileImage,
  NameLabel,
  Dropdown,
  BadgeCount,
  BellIconWithBadge,
  BellIcon,
  LogoutCard,
  CardBar,
} from './HeaderStyled';
import { LogoutPoover } from '@app/components/auth/Logout/LogoutPopover';
import { Popover } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { CurrentUserInfo } from '@app/store/slices/authSlice';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { notificationUsers, setnotifcationCount } from '@app/store/slices/notificationslice';
import noProfile from '@app/assets/images/noProfile.jpeg';

// Create the NotificationIcon component
const Profile: React.FC = () => {
  const [openPop, setOpenPop] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const current_user = useAppSelector((state) => state.auth.userInfo);
  const notificationCount = useAppSelector((state) => state.notification.info.dataNotification);
  useEffect(() => {
    dispatch(CurrentUserInfo());
    dispatch(notificationUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(setnotifcationCount(notificationCount?.length));
  }, [dispatch, notificationCount]);

  const PopoverContent = (
    <div>
      <LogoutCard>
        <CardBar
          onClick={() => {
            navigate('/settings');
            setOpenPop(false);
          }}
        >
          <SettingOutlined style={{ width: '30px' }} />
          Settings
        </CardBar>
        <CardBar
          onClick={() => {
            setOpenLogout(true);
            setOpenPop(false);
          }}
        >
          <LogoutOutlined style={{ width: '30px' }} />
          Logout
        </CardBar>
      </LogoutCard>
    </div>
  );

  return (
    <IconContainer>
      <BellIconWithBadge onClick={() => navigate('/notification')}>
        <BellIcon />
        <BadgeCount
          count={notificationCount?.length}
          overflowCount={9}
          style={{ background: 'linear-gradient(92.08deg, #ed1f50 0%, #a31033 100%)' }}
        />
      </BellIconWithBadge>

      <VerticalLine />
      <ProfileImage
        src={
          current_user?.data?.avatar
            ? `https://storage.googleapis.com/royal-matrimoni/${current_user?.data?.uuid}/profile/${current_user?.data?.avatar}`
            : noProfile
        }
        alt="Profile"
      />
      <NameLabel>
        {current_user?.data?.firstName} &nbsp;
        {current_user?.data?.lastName}
      </NameLabel>
      <Popover placement="bottom" open={openPop} content={PopoverContent}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setOpenPop(!openPop);
          }}
        >
          <Dropdown src={dropdown} alt="dropdown" />
        </span>
      </Popover>
      <LogoutPoover openLogout={openLogout} setOpenLogout={setOpenLogout} setOpenPop={setOpenPop} />
    </IconContainer>
  );
};

export default Profile;
