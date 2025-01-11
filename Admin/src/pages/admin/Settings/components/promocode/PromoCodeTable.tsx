import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import Delete from '../../../../../assets/Bin.svg';
import fileuploader from '../../../../../assets/Edit_Box.svg';
import { Checkbox } from 'antd';

import {
  StyledTable,
  TableCol,
  TableProperty,
  TableActive,
  TableInactive,
  TableSuspended,
  TableHeading,
  Arrrow,
  TableAction,
  Uploader,
  DeleteIcon,
  VerticalLine,
  CheckSquare,
  TablePromo,
} from '../SettingStyled';
import { log } from 'console';

const PromoCodeTable: React.FC = () => {
  const users = [
    {
      promocode: 295863,
      value: 499.0,
      validity: 'Jun 12, 2023',
      limit: '100 (Used 59 times)',
      status: 'Active',
      action: '',
      radio: '',
    },

    {
      promocode: 295864,
      value: 499.0,
      validity: 'Jun 12, 2023',
      limit: '100 (Used 59 times)',
      status: 'Inactive',
      action: '',
      radio: '',
    },

    {
      promocode: 295865,
      value: 499.0,
      validity: 'Jun 12, 2023',
      limit: '100 (Used 59 times)',
      status: 'Suspended',
      action: '',
      radio: '',
    },
    {
      promocode: 295866,
      value: 499.0,
      validity: 'Jun 12, 2023',
      limit: '100 (Used 59 times)',
      status: '',
      action: '',
      radio: '',
    },
    // Add more user objects as needed
  ];
  const columns = [
    {
      title: <Checkbox />,
      dataIndex: 'checkobox',
      key: '1',
      render: (checkbox: any) => (
        <div>
          <CheckSquare>{checkbox}</CheckSquare>
        </div>
      ),
    },
    {
      title: (
        <TableHeading>
          Promo Code <Arrrow />
        </TableHeading>
      ),

      dataIndex: 'promocode',
      key: '2',
      render: (text: number) => {
        return (
          <TableCol>
            <div>{/* <PlusIcon src={MathIcon} alt="MathIcon" /> */}</div>
            <div>
              <TableProperty>{text}</TableProperty> <br />
            </div>
          </TableCol>
        );
      },
    },
    {
      title: (
        <TableHeading>
          Value <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'value',
      key: '3',
      render: (text: number) => (
        <div>
          <TableProperty>{text}</TableProperty>
        </div>
      ),
    },
    {
      title: (
        <TableHeading>
          Validity <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'validity',
      key: '3',
      render: (text: string) => (
        <div>
          <TableProperty>{text}</TableProperty>
        </div>
      ),
    },
    {
      title: (
        <TableHeading>
          Limit <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'limit',
      key: '4',
      render: (text: string) => (
        <div>
          <TableProperty>{text}</TableProperty>
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
      render: (status: string) => (
        <div>
          <div>
            {status === 'Active' ? (
              <TableActive>{status}</TableActive>
            ) : status === 'Inactive' ? (
              <TableInactive>{status}</TableInactive>
            ) : status === 'Suspended' ? (
              <TableSuspended>
                {/* <SuspendIcon src={Suspend} alt="" /> */}
                {status}
              </TableSuspended>
            ) : null}
          </div>
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
      render: () => {
        return (
          <TableAction>
            <Uploader src={fileuploader} alt="fileuploader" />
            <VerticalLine />
            <DeleteIcon src={Delete} alt="Delete" />
          </TableAction>
        );
      },
    },
  ];

  return <StyledTable dataSource={users} columns={columns} />;
};

export default PromoCodeTable;
