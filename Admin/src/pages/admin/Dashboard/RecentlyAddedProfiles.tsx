import { Topbar, Echarts } from './Dashboard.styles';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { Spin } from 'antd';

type ProfileProps = {
  date?: string;
  day?: string;
  month?: string;
  female?: number;
  male?: number;
  Female?: number;
  Male?: number;
  data?: {
    female: number;
    male: number;
  };
};
const RecentlyAddedProfiles = () => {
  const profiles = useAppSelector((state) => state?.dashboard?.profilesInfo);

  const options = {
    grid: { top: 20, right: 20, bottom: 20, left: 40 },
    xAxis: {
      type: 'category',
      data: profiles?.map((item: ProfileProps, index: number) => {
        if (!item?.data) {
          return item?.day ? item?.day : item?.month;
        } else {
          return `Week${index + 1}`;
        }
      }),
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'male',
        data: profiles?.map((item: ProfileProps) => {
          if (!item?.data) {
            return item?.male || item?.Male ? 1 : 0;
          } else {
            return item?.data?.male || 0;
          }
        }),
        type: 'line',
        smooth: true,
        color: '#FF957B',
        yAxisIndex: 0,
        showSymbol: false,
      },
      {
        name: 'Female',
        data: profiles?.map((item: ProfileProps) => {
          if (!item?.data) {
            return item?.female || item?.Female ? 1 : 0;
          } else {
            return item?.data?.female || 0;
          }
        }),
        type: 'line',
        smooth: true,
        color: '#BF83FF',
        yAxisIndex: 0,
        showSymbol: false,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <Spin spinning={profiles?.length === 0 ? true : false}>
      <Topbar>
        <span className="graphTitle">Recently added profiles</span>
        <div className="container">
          {Data?.map((item) => {
            return (
              <div style={{ display: 'flex' }} key={item?.id}>
                <span className={`${item?.name}`}></span>
                <span>{item?.name}</span>
              </div>
            );
          })}
        </div>
      </Topbar>

      <Echarts option={options} chart="line" style={{ height: '15em' }} />
    </Spin>
  );
};

const Data = [
  {
    id: 1,
    name: 'Male',
  },
  {
    id: 2,
    name: 'Female',
  },
];
export default RecentlyAddedProfiles;
