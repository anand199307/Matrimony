import { Echarts, ReligionData, Span } from './Dashboard.styles';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { Spin } from 'antd';

const Relegion = () => {
  const dataReligious = useAppSelector((state) => state.dashboard.religiousInfo);
  const PieOption = {
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          {
            value: dataReligious
              ?.filter((data: { percentage: number; religion: string }) => data?.religion === 'Christian')
              ?.map((item: { percentage: number; religion: string }) => item?.percentage)
              ?.reduce((acc: number, count: number) => acc + count, 0),
            name: 'Christian',
            itemStyle: {
              color: '#FF957B',
            },
          },
          {
            value: dataReligious
              ?.filter((data: { percentage: number; religion: string }) => data?.religion === 'Hindu')
              ?.map((item: { percentage: number; religion: string }) => item?.percentage)
              ?.reduce((acc: number, count: number) => acc + count, 0),
            name: 'Hindu',
            itemStyle: {
              color: '#3289E7',
            },
          },
          {
            value: dataReligious
              ?.filter((data: { percentage: number; religion: string }) => data?.religion === 'Muslim')
              ?.map((item: { percentage: number; religion: string }) => item?.percentage)
              ?.reduce((acc: number, count: number) => acc + count, 0),
            name: 'Muslim',
            itemStyle: {
              color: '#65C591',
            },
          },
          {
            value: dataReligious
              ?.filter((data: { percentage: number; religion: string }) => data?.religion === 'Sikh')
              ?.map((item: { percentage: number; religion: string }) => item?.percentage)
              ?.reduce((acc: number, count: number) => acc + count, 0),
            name: 'Sikhism',
            itemStyle: {
              color: '#FFD57E',
            },
          },
          {
            value: dataReligious
              ?.filter((data: { percentage: number; religion: string }) => data?.religion === 'Jain')
              ?.map((item: { percentage: number; religion: string }) => item?.percentage)
              ?.reduce((acc: number, count: number) => acc + count, 0),
            name: 'Budhism',
            itemStyle: {
              color: '#BF83FF',
            },
          },
        ],
        label: {
          position: 'inside',
          formatter: '{c}%',
          color: '#fff',
          fontWeight: 900,
          fontSize: '16px',
        },
      },
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
    },
  };

  return (
    <Spin spinning={dataReligious?.length === 0 ? true : false}>
      <Echarts option={PieOption} chart="Pie"></Echarts>
      <ReligionData>
        {religionData?.map((item) => {
          return (
            <div style={{ display: 'flex' }} key={item?.id}>
              <Span religionName={item?.name}></Span>
              <span className="span">{item?.name}</span>
            </div>
          );
        })}
      </ReligionData>
    </Spin>
  );
};
const religionData = [
  {
    id: 1,
    name: 'Hindu',
  },
  {
    id: 2,
    name: 'Christian',
  },

  {
    id: 3,
    name: 'Muslim',
  },
  {
    id: 4,
    name: 'Sikhism',
  },
  {
    id: 5,
    name: 'Bhudism',
  },
];
export default Relegion;
