import React from 'react';
import { Article, Container, Text } from './components/NotificationStyled';
import { useAppSelector } from '@app/hooks/reduxHooks';
import NotificationTable from './components/NotificationTable';

const Notification: React.FC = () => {
  const notifications = useAppSelector((state) => state.notification.info.dataNotification);
  return (
    <Container>
      <Article>
        <Text>{`Total ${notifications?.length} notifications`}</Text>
      </Article>

      <NotificationTable />
    </Container>
  );
};

export default Notification;
