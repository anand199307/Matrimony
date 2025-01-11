import { Row, Col } from 'antd';
import * as Info from './Member.styles';
import './index.css';
import { ReactComponent as Verified } from '@app/assets/icons/Shield_Check.svg';
import { ReactComponent as Premium } from '@app/assets/icons/Layer.svg';
import { Carousel } from 'antd';
import { Spin } from 'antd';
import Image2 from '@app/assets/images/noimg.png';

import { useAppSelector } from '@app/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { UserInfo } from './Memberinfocard';

const MemberInfocards = ({ userDetails }: { userDetails?: UserInfo[] }) => {
  const memberInfo = useAppSelector((state) => state.member.info);
  const [loading, setLoading] = useState(false);
  const onClick = (currentSlide: number) => {
    console.log(currentSlide);
  };
  useEffect(() => {
    if (memberInfo) {
      setLoading(false);
    } else setLoading(true);
  }, [memberInfo]);
  const info = memberInfo?.userProfile;
  return (
    <Spin spinning={loading}>
      {userDetails?.map((item: UserInfo, ind) => {
        return (
          <div key={ind}>
            <Info.Cards status={info?.status}>
              <div style={{ display: 'flex', width: '100%' }}>
                <div className="image">
                  <div className="Title"> {item?.title}</div>
                  {item?.title === 'Basic Information:' && (
                    <>
                      <Carousel arrows afterChange={onClick} dots={false}>
                        <div
                          key={item?.id}
                          style={{
                            width: '100%',
                            height: '250px',
                            overflow: 'hidden',
                          }}
                        >
                          {info?.galleryPhoto?.length > 0 ? (
                            info?.galleryPhoto?.map((url: string, ind: number) => {
                              return (
                                <img
                                  src={url}
                                  alt="no img"
                                  key={ind}
                                  style={{ width: '90%', height: '250px', borderRadius: '10px', marginRight: '20px' }}
                                />
                              );
                            })
                          ) : (
                            <img
                              src={Image2}
                              alt="no img"
                              style={{ width: '250px', height: '250px', borderRadius: '10px', marginRight: '20px' }}
                            />
                          )}
                        </div>
                      </Carousel>
                      <div className="verify">
                        {info && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              padding: '5px 40px ',
                              width: '90%',
                            }}
                          >
                            <span style={{ color: 'green' }}>
                              <Verified />
                              <span style={{ padding: '5px' }}>Verified</span>
                            </span>
                            <span>
                              <Premium />
                              <span style={{ padding: '5px' }}>Premium</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div className="infoDeatil">
                  {item?.id === 1 && (
                    <span style={{ margin: '50px -40px 30px' }}>
                      <h2>
                        ID:{info?.profileId}
                        <h4>{item?.id}</h4>
                      </h2>
                      <span>{info?.status === 0 ? 'InActive' : 'Active'}</span>
                    </span>
                  )}
                  <Info.InfoCenter>
                    {item?.info?.map((datas) => {
                      return (
                        <div className="input-filed" key={datas?.id}>
                          <div
                            style={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Row key={datas?.id} style={{ width: '100%' }}>
                              <Col span={13} className="name">
                                {datas?.name}
                              </Col>

                              <Col span={11}>
                                <div className="filed">{datas?.placeholder}</div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      );
                    })}
                  </Info.InfoCenter>
                </div>
              </div>
              <div className="viewscope" style={{}}>
                {item?.title === 'Horoscope Information :' && <Info.Viewscope>View Horoscope</Info.Viewscope>}
              </div>
            </Info.Cards>
          </div>
        );
      })}
    </Spin>
  );
};

export default MemberInfocards;
