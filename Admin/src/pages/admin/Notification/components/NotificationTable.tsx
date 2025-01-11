import { useState } from 'react';
import Delete from '../../../../assets/Bin.svg';
import { Spin } from 'antd';
import moment from 'moment';
import {
  StyledTable,
  TableId,
  TableCol,
  TableProperty,
  TableHeading,
  Arrrow,
  TableAction,
  DeleteIcon,
  TableName,
} from './NotificationStyled';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { updateNotificationStatus } from '@app/store/slices/notificationslice';
import { useAppSelector } from '@app/hooks/reduxHooks';

export interface User {
  notificationId?: string;
  sender?: {
    _id: string;
    profileId?: string;
  };
  receiver?: string;
  title?: string;
  body?: string;
  status?: boolean;
  createdAt?: string;
}

const NotificationTable = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const notifications = useAppSelector((state) => state.notification.info.dataNotification);
  const handlenotificationstatus = (record: User) => {
    if (record?.notificationId) {
      dispatch(updateNotificationStatus({ uuid: record?.notificationId, status: 1 }));
    }
  };

  const columns = [
    {
      title: (
        <div>
          <TableHeading>
            ID & Name <Arrrow />
          </TableHeading>
        </div>
      ),
      key: '1',
      render: (record: User) => {
        return (
          <TableCol>
            <div>{/* <PlusIcon src={MathIcon} alt="MathIcon" /> */}</div>
            <div>
              <TableName>{record?.sender?.profileId}</TableName> <br />
              <TableId>{record?.sender?._id}</TableId>
            </div>
          </TableCol>
        );
      },
    },

    {
      title: (
        <div style={{ width: '300px' }}>
          <TableHeading>
            Message <Arrrow />
          </TableHeading>
        </div>
      ),
      key: 'message',
      dataIndex: 'body',
      render: (record: string) => (
        // <div>
        //   {record?.body === 'complaint' ? (
        //     <div>
        //       <span style={{ color: '#ED1F50' }}>{record?.sender?.profileId}</span> <span>Reported</span>
        //       <span style={{ color: '#A31033' }}>{record?.sender?.profileId}</span>
        //     </div>
        //   ) : record?.body === 'declined' ? (
        //     <div>
        //       <span style={{ color: '#ED1F50' }}>{record?.sender?.profileId}</span>
        //       <span>changed his profile status</span>
        //     </div>
        //   ) : (
        //     <div>
        //       <span style={{ color: '#ED1F50' }}>{record?.sender?.profileId}</span>
        //       <span>Payment updated successfully</span>
        //     </div>
        //   )}
        // </div>
        <div>{record}</div>
      ),
    },
    {
      title: (
        <div style={{ width: '280px' }}>
          <TableHeading>
            Date <Arrrow />
          </TableHeading>
        </div>
      ),
      dataIndex: 'createdAt',
      key: '3',
      render: (text: string) => (
        <div>
          <TableProperty>{moment(text).format('MMMM DD,YYYY')}</TableProperty>
        </div>
      ),
    },

    {
      title: (
        <TableHeading>
          Actions
          {/* <Arrrow /> */}
        </TableHeading>
      ),
      key: 'action',
      render: (record: User) => {
        return (
          <TableAction>
            <DeleteIcon src={Delete} alt="Delete" onClick={() => handlenotificationstatus(record)} />
          </TableAction>
        );
      },
    },
  ];
  const itemsPerPage = 10;

  const dataToDisplay = notifications?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const pagination = {
    current: currentPage,
    pageSize: itemsPerPage,
    total: notifications?.length,
    defaultPageSize: 10,
    hideOnSinglePage: true,
    onChange: (page: any) => setCurrentPage(page),
  };
  return (
    <>
      <Spin spinning={!dataToDisplay}>
        <StyledTable dataSource={dataToDisplay} columns={columns} pagination={pagination} />
      </Spin>
    </>
  );
};

export default NotificationTable;
