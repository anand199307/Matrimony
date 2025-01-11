import { Profiletable, Wrapper } from './Dashboard.styles';
import { ArrowUpOutlined } from '@ant-design/icons';
import moment from 'moment';
import Success from '@app/assets/Triangle_Warning.png';
import Pending from '@app/assets/Circle_Check.png';
import * as S from '../Members/AllMembers/components/MembersStyled';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { Spin } from 'antd';

const RecentProfilestable = () => {
  const current_user = useAppSelector((state) => state.auth.userInfo);
  const usersInfo = useAppSelector((state) => state.data.info);
  const users = usersInfo?.info?.response?.users;

  const filtereddata = users?.filter(
    (item: { email: string; role: string }) => item?.email !== current_user?.email && item?.role === 'user',
  );
  const columns = [
    {
      title: (
        <S.TableHeading>
          ID & Name
          <ArrowUpOutlined
            style={{
              fontSize: '14px',
              padding: '0px 0px 0px 10px',
            }}
          />
        </S.TableHeading>
      ),
      key: '1',
      // maxWidth: '200px',
      render: (record: typeof users) => {
        return (
          <div style={{ fontWeight: 600, fontSize: '15px', fontStyle: 'normal', fontFamily: 'poppenis' }}>
            {record.firstName && record.firstName ? (
              <h5>
                {record.firstName}&nbsp;{record.lastName}
              </h5>
            ) : record?.firstName ? (
              <h5>{record.firstName}</h5>
            ) : record?.lastName ? (
              <h5>{record.lastName}</h5>
            ) : (
              ' -'
            )}
            <br />
            <S.TableId style={{ paddingBottom: '-40px' }}>{record.profileId}</S.TableId>
          </div>
        );
      },
    },
    {
      title: (
        <S.TableHeading>
          Gender <ArrowUpOutlined style={{ fontSize: '14px', padding: '0px 0px 0px 10px' }} />
        </S.TableHeading>
      ),
      dataIndex: 'gender',
      key: '2',
      render: (text: string) => (
        <div>
          <S.TableProperty>{text ? text : 'Not Mentioned'}</S.TableProperty>
        </div>
      ),
    },

    {
      title: (
        <S.TableHeading style={{ padding: '20px 20px' }}>
          Plan <ArrowUpOutlined style={{ fontSize: '14px', padding: '0px 0px 0px 10px' }} />
        </S.TableHeading>
      ),
      dataIndex: 'membership',
      key: '4',
      render: (text: string) => (
        <div>
          <S.TableProperty>{text}</S.TableProperty>
        </div>
      ),
    },

    {
      title: (
        <S.TableHeading>
          ID Verification <ArrowUpOutlined style={{ fontSize: '14px', padding: '0px 0px 0px 10px' }} />
        </S.TableHeading>
      ),
      dataIndex: 'idVerified',
      key: '5',

      render: (rowData: boolean) => (
        <div>
          {rowData ? (
            <S.TablePending>
              <S.PendingIcon src={Pending} alt="" />
              Verified
            </S.TablePending>
          ) : (
            <S.TableSuccess>
              <S.SuccessIcon src={Success} alt="" />
              Pending
            </S.TableSuccess>
          )}
        </div>
      ),
    },
    {
      title: (
        <S.TableHeading>
          Date of Join <ArrowUpOutlined style={{ fontSize: '14px', padding: '0px 0px 0px 10px' }} />
        </S.TableHeading>
      ),
      dataIndex: 'createdAt',
      key: '6',
      render: (text: string) => (
        <div>
          <S.TableProperty>{moment(text).format('MMMM DD,YYYY')}</S.TableProperty>
        </div>
      ),
    },
    {
      title: (
        <S.TableHeading>
          Status <ArrowUpOutlined style={{ fontSize: '14px', padding: '0px 0px 0px 10px' }} />
        </S.TableHeading>
      ),
      dataIndex: 'status',
      key: '7',
      render: (status: number) => (
        <div>
          <div>
            {status === 1 ? <S.TableActive>Active</S.TableActive> : <S.TableInactive>InActive</S.TableInactive>}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Spin spinning={!filtereddata}>
      <Wrapper>
        <Profiletable
          dataSource={filtereddata}
          columns={columns}
          pagination={false}
          style={{
            width: '100%',
          }}
        />
      </Wrapper>
    </Spin>
  );
};
export default RecentProfilestable;
