import React, { useState } from 'react';
import { Spin } from 'antd';
import CopyImg from '../../../../../assets/Copy.png';
import ProfileImg from '../../../../../assets/Rectangle 10.png';
import FileImg from '../../../../../assets/Group 17.png';
import Squarecheck from '../../../../../assets/Square_Check.png';
import SquareClose from '../../../../../assets/Close_M.png';
import moment from 'moment';
import { Modal } from 'antd';

import {
  TableId,
  TableProperty,
  TableHeading,
  Arrrow,
  TableAction,
  TablePorfile,
  CopyIcon,
  TableImg,
  IdImg,
  CheckSquare,
  CloseSquare,
} from './RequestStyled';
import { StyledTable } from '../../AllMembers/components/MembersStyled';
import { requestUser } from './RequestData';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { updateRequest } from '@app/store/slices/settingSlice';
import { Input } from 'antd';

interface UserTableProps {
  users: requestUser[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const TableRequest: React.FC<UserTableProps> = ({ users, currentPage, setCurrentPage }) => {
  const { TextArea } = Input;
  const [reason, setReason] = useState('');
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState<requestUser>();

  const handleReason = (e: any) => {
    setReason(e.target.value);
  };
  const ApprovedRequest = (record: requestUser, res?: string) => {
    const planFormPayload = {
      requestId: record?.requestId,
      verificationStatus: 'approved',
    };
    if (res) {
      setIsModalOpen(true);
      setRecord(record);
    } else {
      dispatch(
        updateRequest({
          Payload: { ...planFormPayload },
        }),
      );
    }
  };

  const handleOk = () => {
    if (reason?.length > 0) {
      const planFormPayload = {
        requestId: record?.requestId,
        verificationStatus: 'rejected',
        reasons: reason,
      };
      dispatch(
        updateRequest({
          Payload: { ...planFormPayload },
        }),
      );

      setIsModalOpen(false);
      setReason('');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: (
        <div>
          <TableHeading>
            From Request <Arrrow />
          </TableHeading>
        </div>
      ),

      key: '1',
      width: '1%',
      render: (record: requestUser) => {
        return (
          // <div>{/* <PlusIcon src={MathIcon} alt="MathIcon" /> */}</div>
          <>
            <TableProperty>{record?.user?.email}</TableProperty> <br />
            <TableId>{record.user?.profileId}</TableId>
          </>
        );
      },
    },
    {
      title: (
        <div>
          <TableHeading>
            Request Date <Arrrow />
          </TableHeading>
        </div>
      ),
      dataIndex: 'createdAt',
      key: '2',
      width: '13%',
      margin: '100px',
      render: (text: string) => (
        <div>
          <TableProperty>{moment(text).format('MMMM DD,YYYY')}</TableProperty>
        </div>
      ),
    },
    {
      title: (
        <div style={{ marginRight: '-10px' }}>
          <TableHeading>
            Date of Birth <Arrrow />
          </TableHeading>
        </div>
      ),
      dataIndex: 'dateofBirth',
      key: '3',
      width: '12%',
      render: (text: number) => (
        <div>
          {/* <TableProperty>28-07-2023</TableProperty> */}
          <TableProperty>{text ? text : 'not mentioned'}</TableProperty>
        </div>
      ),
    },
    {
      title: (
        <div style={{ marginRight: '10px' }}>
          <TableHeading>
            ID Type <Arrrow />
          </TableHeading>
        </div>
      ),
      dataIndex: 'idType',
      key: '4',
      width: '11%',
      render: (text: string) => (
        <div>
          <TableProperty>{text ? text : 'not mentioned'}</TableProperty>
        </div>
      ),
    },

    {
      title: (
        <TableHeading>
          Id Number <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'requestId',
      key: '5',
      width: '12%',
      render: (rowData: string) => {
        return (
          <div>
            <TableProperty style={{ display: 'flex', justifyContent: 'space-between' }}>
              {rowData}

              <CopyIcon
                onClick={() => {
                  navigator.clipboard.writeText(rowData);
                }}
                src={CopyImg}
                alt="CopyImg"
              />
            </TableProperty>
          </div>
        );
      },
    },
    {
      title: (
        <div style={{ marginRight: '-10px' }}>
          <TableHeading>
            Profile Photo <Arrrow />
          </TableHeading>
        </div>
      ),
      dataIndex: 'profilephoto',
      key: '6',
      width: '12.5%',
      render: (imageUrl: string) => (
        <div>
          <TablePorfile>
            <TableImg src={ProfileImg} alt="ProfileImg" />
          </TablePorfile>
        </div>
      ),
    },
    {
      title: (
        <div>
          <TableHeading>
            ID Photo <Arrrow />
          </TableHeading>
        </div>
      ),
      width: '9.5%',
      dataIndex: 'idphoto',
      key: '7',
      render: (status: string) => (
        <div>
          <TableProperty>
            <IdImg src={FileImg} alt="" />
          </TableProperty>
        </div>
      ),
    },

    {
      title: (
        <div>
          <TableHeading>
            Actions
            {/* <Arrrow /> */}
          </TableHeading>
        </div>
      ),
      // width: '7%',
      key: 'action',
      render: (record: requestUser) => {
        return (
          <TableAction>
            <div onClick={() => ApprovedRequest(record)} style={{ cursor: 'pointer', marginRight: '10px' }}>
              <CheckSquare src={Squarecheck} alt="" />
            </div>

            <div onClick={() => ApprovedRequest(record, 'rejected')} style={{ cursor: 'pointer' }}>
              <CloseSquare src={SquareClose} alt="" />
            </div>
            <Modal title="Reason For Rejection" mask={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <TextArea rows={4} placeholder="Enter reason for rejection" onChange={handleReason} value={reason} />
            </Modal>
          </TableAction>
        );
      },
    },
  ];
  const itemsPerPage = 10;

  const dataToDisplay = users?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const pagination = {
    current: currentPage,
    pageSize: itemsPerPage,
    total: users?.length,
    defaultPageSize: 10,
    hideOnSinglePage: true,
    onChange: (page: any) => setCurrentPage(page),
  };
  return (
    <Spin spinning={!users}>
      <StyledTable dataSource={dataToDisplay} columns={columns} pagination={pagination} />
    </Spin>
  );
};

export default TableRequest;
