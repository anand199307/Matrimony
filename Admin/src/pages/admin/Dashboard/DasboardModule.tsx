import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { StyledDiv, Cards, Buttons, DisplayCard, Topbar } from './Dashboard.styles';
import { ReactComponent as AllMembers } from '@app/assets/icons/allMembers.svg';
import { ReactComponent as Female } from '@app/assets/icons/female.svg';
import { ReactComponent as Male } from '@app/assets/icons/male.svg';
import { ReactComponent as Blocked } from '@app/assets/icons/blocked.svg';
import RecentlyAddedProfiles from './RecentlyAddedProfiles';
import RecentProfilestable from './RecentProfilesTable';
import Revenue from './Revenue';
import Relegion from './Relegion';
import { useEffect } from 'react';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { ProfilesChart, UserCountInfo, religiousData } from '@app/store/slices/dashboard';
import { UsersInfo } from '@app/store/slices/settingSlice';
import dayjs from 'dayjs';

export interface membercount {
  count: number;
  gender: string;
}

const DashboardModule = () => {
  const [activeButton, setActiveButton] = useState('Week');
  const dispatch = useAppDispatch();
  const currentDate = dayjs();
  const currentMonth = currentDate.format('MM');
  const currentYear = currentDate.format('YYYY');
  useEffect(() => {
    if (activeButton) {
      dispatch(UserCountInfo(activeButton));
      dispatch(religiousData(activeButton));
      dispatch(UsersInfo({}));
      const filter = activeButton === 'Year' ? currentYear : activeButton === 'Month' ? currentMonth : 'Week';
      dispatch(ProfilesChart({ activebtn: activeButton.toLocaleLowerCase(), year: currentYear, filter: filter }));
    }
  }, [dispatch, activeButton, currentMonth, currentYear]);

  const result = useAppSelector((state) => state.dashboard.count) as any;
  const maleCount = result?.userStats
    ?.filter((item: membercount) => item?.gender === 'Male')
    ?.map((item: membercount) => item?.count)
    ?.reduce((acc: number, count: number) => acc + count, 0);

  const femaleCount = result?.userStats
    ?.filter((item: membercount) => item?.gender === 'Female')
    ?.map((item: membercount) => item?.count)
    ?.reduce((acc: number, count: number) => acc + count, 0);

  const CardDetails = [
    {
      title: 'All Members',
      count: result?.totalUserCount,
      icon: <AllMembers />,
    },
    {
      title: 'Male',
      count: maleCount,
      icon: <Male />,
    },
    {
      title: 'Female',
      count: femaleCount,
      icon: <Female />,
    },
    {
      title: 'Blocked',
      count: result?.bolckedUsers,
      icon: <Blocked />,
    },
  ];

  return (
    <StyledDiv>
      <Row
        style={{
          justifyContent: 'space-between',
        }}
      >
        <Col style={{ width: '73%' }}>
          <Cards style={{ height: '16em' }}>
            <div className="mainDiv">
              <span className="title">Members</span>
              <div>
                {ButtionDetails?.map((item, ind) => {
                  return (
                    <Buttons
                      key={ind}
                      name={item?.name}
                      active={activeButton}
                      onClick={() => setActiveButton(item?.name)}
                    >
                      {item?.name}
                    </Buttons>
                  );
                })}
              </div>
            </div>
            <div className="wrapper">
              {CardDetails?.map((data, ind) => {
                return (
                  <DisplayCard key={ind} name={data?.title}>
                    <div className="countBox">
                      <span className="count">{data?.count}</span>
                      <span className="text">{data?.title}</span>
                    </div>
                    <div className="icon">{data?.icon}</div>
                  </DisplayCard>
                );
              })}
            </div>
          </Cards>
          <Cards style={{ height: '23em' }}>
            <RecentlyAddedProfiles />
          </Cards>
          <Cards style={{ height: '450px' }} cardType="profiles">
            <Topbar cardType="profiles">
              <span className="graphTitle">Recent Profiles</span>
            </Topbar>
            <RecentProfilestable />
          </Cards>
        </Col>
        <Col style={{ width: '26%' }}>
          <Cards style={{ height: '38em' }}>
            <Topbar>
              <span className="graphTitle">Revenue</span>
            </Topbar>
            <Revenue />
          </Cards>
          <Cards style={{ height: '470px' }}>
            <Topbar>
              <span className="graphTitle">Religion Added</span>
            </Topbar>
            <Relegion />
          </Cards>
        </Col>
      </Row>
    </StyledDiv>
  );
};

const ButtionDetails = [
  {
    name: 'Week',
    status: 'active',
  },
  {
    name: 'Month',
    status: 'Notactive',
  },
  {
    name: 'Year',
    status: 'Notactive',
  },
];

export default DashboardModule;
