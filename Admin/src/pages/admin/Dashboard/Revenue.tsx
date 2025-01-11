import React from 'react';
import { Echarts } from './Dashboard.styles';
import { Revenuedata } from './Dashboard.styles';
import { ReactComponent as Total } from '@app/assets/icons/TotalRevenue.svg';
import { ReactComponent as Free } from '@app/assets/icons/FreeMembers.svg';
import { ReactComponent as Paid } from '@app/assets/icons/PaidMembers.svg';

const Revenue = () => {
  const options = {
    grid: { top: 50, right: 10, bottom: 20, left: 30 },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      length: 6,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: 'Free Members',
        type: 'bar',
        color: '#FA5A7D',
        barWidth: 6,
        marginLeft: '60px',
        data: [10, 20, 6, 20, 6, 8, 6],
      },
      {
        name: 'paid Members',
        type: 'bar',
        barWidth: 6,
        color: '#FF9C00',
        data: [2, 5.9, 9, 26, 4, 9, 9],
      },
    ],
  };
  return (
    <>
      <Echarts option={options} chart="bar" style={{ width: '100%', height: '200px' }}></Echarts>
      <Revenuedata>
        {revenueData?.map((item, ind) => {
          return (
            <div key={ind} className="wrapper">
              <div className="icontext">
                <span>{item?.icon}</span>
                <span className="text">{item?.name}</span>
              </div>
              <div className="count">{item?.count}</div>
            </div>
          );
        })}
      </Revenuedata>
    </>
  );
};
const revenueData = [
  {
    name: 'Total revenue',
    count: '560k',
    icon: <Total />,
  },
  {
    name: 'Free Members',
    count: '340',
    icon: <Free />,
  },

  {
    name: 'Paid Members',
    count: '200',
    icon: <Paid />,
  },
];
export default Revenue;
