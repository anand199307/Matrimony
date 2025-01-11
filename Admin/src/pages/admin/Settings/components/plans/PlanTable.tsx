import React from 'react';
import Delete from '../../../../../assets/Bin.svg';
import fileuploader from '../../../../../assets/Edit_Box.svg';
import { Spin } from 'antd';
import {
  TableCol,
  TableProperty,
  TableActive,
  TableInactive,
  TableHeading,
  Arrrow,
  TableAction,
  VerticalLine,
  Uploader,
  DeleteIcon,
} from '../SettingStyled';
import { StyledTable } from '@app/pages/admin/Members/AllMembers/components/MembersStyled';
import { planUser } from './PlanData';
import { SetformPlanDatas, PlanFormUpdate, PlanInfo } from '@app/store/slices/settingSlice';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { useAppSelector } from '@app/hooks/reduxHooks';

interface ButtonProps {
  setAddPlan: (value: boolean) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

interface UserTableProps extends ButtonProps {
  //users: planUser[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setAddPlan: (value: boolean) => void;
}

const PlanTable: React.FC<UserTableProps> = ({ setAddPlan, currentPage, setCurrentPage }) => {
  const PlanInformation = useAppSelector((state) => state.data.info.planlist);
  const users = PlanInformation?.response?.data;
  const dispatch = useAppDispatch();

  const handleDeleteRow = (data: planUser) => {
    dispatch(PlanFormUpdate({ uuid: data?.uuid, planFormPayload: {}, status: 0 }));
  };

  const profileView = (data: planUser) => {
    dispatch(SetformPlanDatas(data));
    setAddPlan(true);
  };

  const columns = [
    {
      title: (
        <TableHeading>
          Plan name <Arrrow />
        </TableHeading>
      ),

      dataIndex: 'name',
      key: '2',
      render: (text: string) => {
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
      dataIndex: 'price',
      key: '4',
      render: (text: string) => (
        <TableAction style={{ gap: '2px' }}>
          &#8377;
          <TableProperty>{text}</TableProperty>
        </TableAction>
      ),
    },
    {
      title: (
        <TableHeading>
          Plan Duration <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'durationInMonths',
      key: '5',
      render: (text: string) => (
        <div>
          <TableProperty>{`${text} Months`}</TableProperty>
        </div>
      ),
    },

    {
      title: (
        <TableHeading>
          Contacts <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'contactLimit',
      key: '6',
      render: (text: string) => (
        <div>
          <TableProperty>{text ? text : 'Not Mentioned'}</TableProperty>
        </div>
      ),
    },

    {
      title: (
        <TableHeading>
          Chat <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'chatOption',
      key: '7',
      render: (text: string) => (
        <div>
          <TableProperty>{text ? 'Yes' : 'No'}</TableProperty>
        </div>
      ),
    },

    {
      title: (
        <TableHeading>
          Horoscope <Arrrow />
        </TableHeading>
      ),
      dataIndex: 'horoscopeOption',
      key: '7',
      render: (text: string) => (
        <div>
          <TableProperty>{text ? 'Yes' : 'No'}</TableProperty>
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
      key: '8',
      width: '200px',

      render: (status: number) => (
        <div style={{ width: '200px' }}>
          {status === 1 ? <TableActive>Active</TableActive> : <TableInactive>InActive</TableInactive>}
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
      key: 'action',
      render: (record: planUser) => {
        return (
          <div>
            <TableAction>
              <Uploader src={fileuploader} alt="fileuploader" onClick={() => profileView(record)} />
              <VerticalLine />
              <DeleteIcon src={Delete} alt="Delete" onClick={() => handleDeleteRow(record)} />
            </TableAction>
          </div>
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
    onChange: (page: number) => setCurrentPage(page),
    defaultPageSize: 10,
    hideOnSinglePage: true,
  };

  return (
    <Spin spinning={!dataToDisplay}>
      <StyledTable dataSource={dataToDisplay} columns={columns} pagination={pagination} />
    </Spin>
  );
};

export default PlanTable;
