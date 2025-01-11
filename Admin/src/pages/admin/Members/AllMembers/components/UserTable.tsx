import React, { useState } from 'react';
import { Spin } from 'antd';
import Delete from '../../../../../assets/Bin.svg';
import ViewEye from '../../../../../assets/Eye.svg';
import Print from '../../../../../assets/Print.svg';
import fileuploader from '../../../../../assets/Edit_Box.svg';
import Success from '../../../../../assets/Triangle_Warning.png';
import Pending from '../../../../../assets/Circle_Check.png';
import { User } from './MemberTable';
import { useDispatch } from 'react-redux';
import { updateUser } from '@app/store/slices/memberInfoSlice';
import { MemberBasicInfo, MemberInfo } from '@app/store/slices/memberInfoSlice';
import { downloadProfile } from '@app/store/slices/addMember';

import moment from 'moment';
import {
  StyledTable,
  TableId,
  TableCol,
  TableProperty,
  TableSuccess,
  TablePending,
  TableActive,
  TableInactive,
  TableHeading,
  Arrrow,
  TableAction,
  Uploader,
  DeleteIcon,
  PrintIcon,
  EyeIcon,
  VerticalLine,
  SuccessIcon,
  PendingIcon,
} from './MembersStyled';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@app/hooks/reduxHooks';

interface UserTableProps {
  users: User[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const UserTable: React.FC<UserTableProps> = ({ users, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const current_user = useAppSelector((state) => state.auth.userInfo);
  // const [currentPage, setCurrentPage] = useState(1);

  const filtereddata = users?.filter((item: any) => item?.email !== current_user?.email && item?.role === 'user');

  const profileView = (data: User) => {
    dispatch(MemberInfo(data?.uuid ? data?.uuid : ''));
    dispatch(MemberBasicInfo(data));
    navigate('/member-info');
  };

  const downloadPdf = (data: User) => {
    if (data) {
      dispatch(downloadProfile(data?.uuid ? data?.uuid : ''));
    }
  };

  const handleUpdateStatus = (record: User) => {
    if (record?.uuid) {
      dispatch(updateUser({ uuid: record?.uuid, status: 0 }));
    }
  };

  const columns = [
    {
      title: (
        <TableHeading>
          ID & Name <Arrrow />
        </TableHeading>
      ),
      key: '1',
      maxWidth: '200px',
      render: (record: User) => {
        return (
          // <div>{/* <PlusIcon src={MathIcon} alt="MathIcon" /> */}</div>
          <TableCol>
            <div style={{ fontWeight: 600, fontSize: '1rem' }}>
              {record.firstName && record.firstName ? (
                <TableAction>
                  {record.firstName}&nbsp;{record.lastName}
                </TableAction>
              ) : record?.firstName ? (
                <TableAction>{record.firstName}</TableAction>
              ) : record?.lastName ? (
                <TableAction>{record.lastName}</TableAction>
              ) : (
                ' -'
              )}
              <TableId>{record.profileId}</TableId>
            </div>
          </TableCol>
        );
      },
    },
    {
      title: (
        <TableHeading>
          Gender <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'gender',
      key: '2',
      render: (text: string) => (
        <div>
          <TableProperty>{text ? text : '-'}</TableProperty>
        </div>
      ),
    },
    {
      title: (
        <TableHeading>
          Age <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'age',
      key: '3',
      render: (text: number) => (
        <div>
          <TableProperty>{text ? text : 0}</TableProperty>
        </div>
      ),
    },
    {
      title: (
        <TableHeading>
          Plan <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'membership',
      key: '4',
      render: (text: string) => (
        <div>
          <TableProperty>{text}</TableProperty>
        </div>
      ),
    },

    {
      title: (
        <div style={{ width: '160px' }}>
          <TableHeading>
            ID Verification <Arrrow />
          </TableHeading>
        </div>
      ),
      dataIndex: 'idVerified',
      key: '5',
      render: (rowData: boolean) => (
        <div>
          {rowData ? (
            <TablePending>
              <PendingIcon src={Pending} alt="" />
              Verified
            </TablePending>
          ) : (
            <TableSuccess>
              <SuccessIcon src={Success} alt="" />
              Pending
            </TableSuccess>
          )}
        </div>
      ),
    },
    {
      title: (
        <TableHeading>
          Date of Join <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'createdAt',
      key: '6',
      render: (text: string) => (
        <div>
          <TableProperty>{moment(text).format('MMMM DD,YYYY')}</TableProperty>
        </div>
      ),
    },
    {
      title: (
        <TableHeading>
          Status <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'status',
      key: '7',
      render: (status: number) => (
        <div>
          <div>{status === 1 ? <TableActive>Active</TableActive> : <TableInactive>InActive</TableInactive>}</div>
        </div>
      ),
    },
    {
      title: (
        <TableHeading>
          Location <Arrrow />
        </TableHeading>
      ),
      key: '8',
      render: (text: any) => {
        return <TableProperty>{text?.locationDetails ? text?.locationDetails?.city : '-'}</TableProperty>;
      },
    },

    {
      title: (
        <TableHeading>
          Actions
          {/* <Arrrow /> */}
        </TableHeading>
      ),
      key: '9',
      render: (record: User) => {
        return (
          <TableAction>
            <EyeIcon src={ViewEye} alt="ViewEye" onClick={() => profileView(record)} />
            <VerticalLine />
            <Uploader
              onClick={() => {
                dispatch(MemberInfo(record?.uuid ? record?.uuid : ''));
                dispatch(MemberBasicInfo(record));
                navigate('/add-member');
              }}
              src={fileuploader}
              alt="fileuploader"
            />
            <VerticalLine />
            <DeleteIcon src={Delete} alt="Delete" onClick={() => handleUpdateStatus(record)} />
            <VerticalLine />
            <div onClick={() => downloadPdf(record)}>
              <PrintIcon src={Print} alt="Print" />
            </div>
          </TableAction>
        );
      },
    },
  ];

  const itemsPerPage = 10;

  const dataToDisplay = filtereddata?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const pagination = {
    current: currentPage,
    pageSize: itemsPerPage,
    total: filtereddata?.length,
    defaultPageSize: 10,
    hideOnSinglePage: true,
    onChange: (page: any) => setCurrentPage(page),
  };

  return (
    <Spin spinning={!dataToDisplay}>
      <StyledTable dataSource={dataToDisplay} columns={columns} pagination={pagination} loading={loading} />
    </Spin>
  );
};

export default UserTable;
