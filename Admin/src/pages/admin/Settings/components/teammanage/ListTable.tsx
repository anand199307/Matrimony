import React, { useEffect, useState } from 'react';
import { UsersInfo } from '@app/store/slices/settingSlice';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { TableCol, TableProperty, TableHeading, TableRole, SelectBox } from '../SettingStyled';
import { TableActive, TableInactive } from '@app/pages/admin/Members/AllMembers/components/MembersStyled';
import { Spin } from 'antd';
import { StyledTable } from '@app/pages/admin/Members/AllMembers/components/MembersStyled';

const ListTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const usersInfo = useAppSelector((state) => state.data.info);
  const users = usersInfo?.info?.response?.users;
  const current_user = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    dispatch(UsersInfo({ page: currentPage }));
  }, [dispatch, currentPage]);
  const filtereddata =
    users &&
    users?.filter(
      (item: { email: string; role: string }) => item?.email !== current_user?.email && item?.role === 'admin',
    );

  const columnsData = [
    {
      title: (
        <TableHeading>
          Name <ArrowUpOutlined style={{ fontSize: '12px' }} />
        </TableHeading>
      ),

      //dataIndex: 'firtsName',
      key: '2',
      render: (text: typeof users) => {
        return (
          <TableCol>
            <div>{/* <PlusIcon src={MathIcon} alt="MathIcon" /> */}</div>
            <div>
              <TableProperty style={{ fontWeight: 600, fontSize: '14px' }}>
                {text.firstName && text.firstName ? (
                  <span>
                    {text.firstName} &nbsp;
                    {text.lastName}
                  </span>
                ) : text?.firstName ? (
                  <span>{text.firstName}</span>
                ) : text?.lastName ? (
                  <span>{text.lastName}</span>
                ) : (
                  <span>-</span>
                )}
              </TableProperty>{' '}
              <br />
            </div>
          </TableCol>
        );
      },
    },
    {
      title: (
        <TableHeading>
          Email <ArrowUpOutlined style={{ fontSize: '12px' }} />
        </TableHeading>
      ),
      dataIndex: 'email',
      key: '2',
      render: (text: string) => (
        <div>
          <TableProperty>{text}</TableProperty>
        </div>
      ),
    },

    {
      title: (
        <TableHeading>
          Role
          <ArrowUpOutlined style={{ fontSize: '12px' }} />
        </TableHeading>
      ),
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        return (
          <TableRole>
            <SelectBox>{role}</SelectBox>
          </TableRole>
        );
      },
    },
    {
      title: (
        <TableHeading>
          Status
          <ArrowUpOutlined style={{ fontSize: '12px' }} />
        </TableHeading>
      ),
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        return status === 1 ? <TableActive>Active</TableActive> : <TableInactive>InActive</TableInactive>;
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
    onChange: (page: number) => setCurrentPage(page),
  };
  return (
    <Spin spinning={!dataToDisplay}>
      <StyledTable
        dataSource={dataToDisplay}
        columns={columnsData}
        pagination={pagination}
        style={{ padding: '0px' }}
      />
    </Spin>
  );
};

export default ListTable;
