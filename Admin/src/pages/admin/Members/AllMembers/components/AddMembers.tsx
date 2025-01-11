import React from 'react';
import FilterIcon from '../../../../../assets/Icon.png';
import { AddMember, Text, FilterButton, FilterText, AddMemberButton, Cards, Filters, StyledPop } from './MembersStyled';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { MemberBasicInfo, MemberInfo } from '@app/store/slices/memberInfoSlice';
import { Popover } from 'antd';

type Props = {
  setSelectedName: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  selected: boolean;
};
const AddMembers = ({ setSelectedName, setSelected, selected }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const filtered = (name: any) => {
    setSelected(!selected);
    setSelectedName(name);
  };

  const Popdata = (
    <div>
      {popvalue?.map((data) => {
        return (
          <StyledPop key={data?.id}>
            <div onClick={() => filtered(data?.name)}>
              <div className="iconDisplay">{data?.name}</div>
            </div>
          </StyledPop>
        );
      })}
    </div>
  );
  const current_user = useAppSelector((state) => state.auth.userInfo);
  const usersInfo = useAppSelector((state) => state.data.info);
  const users = usersInfo?.info?.response?.users;
  const filtereddata = users?.filter((item: any) => item?.email !== current_user?.email);

  return (
    <AddMember>
      <Text>{`We have total ${filtereddata?.length ? filtereddata?.length : 0} members`}</Text>
      <Cards>
        <Popover placement="bottom" content={Popdata} trigger="click">
          <FilterButton>
            <Filters src={FilterIcon} alt="FilterIcon" />
            <FilterText>Filter</FilterText>
          </FilterButton>
        </Popover>
        <AddMemberButton
          onClick={() => {
            dispatch(MemberInfo(undefined));
            dispatch(MemberBasicInfo(undefined));
            navigate('/add-member');
          }}
        >
          <PlusOutlined />
          Add Members
        </AddMemberButton>
      </Cards>
    </AddMember>
  );
};
const popvalue = [
  // {
  //   id: 1,
  //   name: 'Male',
  // },
  // {
  //   id: 2,
  //   name: 'Female',
  // },
  {
    id: 1,
    name: 'Active',
  },
  {
    id: 2,
    name: 'In Active',
  },
  {
    id: 3,
    name: 'Blocked',
  },
  // {
  //   id: 6,
  //   name: 'Verfied',
  // },
];

export default AddMembers;
