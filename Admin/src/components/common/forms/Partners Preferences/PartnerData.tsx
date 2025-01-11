import { Details } from './PartnerInfoData';
import { Info, Cards, Inputbox, Selectoption } from '../FormStyled';
import { Form, Row, Col } from 'antd';
import { ReactComponent as CaretDownOutlined } from '@app/assets/icons/Vector.svg';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { stateProps } from './PartnerInfoData';
import { citylist, selectedPartnerSign } from '@app/store/slices/addMember';
import { useDispatch } from 'react-redux';

const PartnerData = ({ PartnerInformation }: { PartnerInformation?: Details[] }) => {
  const [stateId, setStateId] = useState('');
  const dispatch = useDispatch<any>();
  const moon_list = useAppSelector((state) => state.form.stars);
  const state_list = useAppSelector((state) => state.form.selectStates);
  const stars_list = useAppSelector((state) => state.form.PartnerstarList);
  const handleSelect = (value: any) => {
    state_list?.data.filter((item: stateProps) => {
      if (item?.name === value) {
        setStateId(item?.uuid);
      }
    });
  };
  useEffect(() => {
    if (stateId) {
      dispatch(citylist(stateId));
    }
  }, [dispatch, stateId]);

  const handleSign = (value: any) => {
    const filtered = moon_list?.data?.filter((item: stateProps) => value?.includes(item?.name));
    const combinedArray = filtered?.map((item: stateProps) => item?.startDetails);
    const data = combinedArray?.map((item) => {
      return item?.map((data) => {
        return data;
      });
    });

    dispatch(selectedPartnerSign(data));
  };
  const moonSignList = moon_list?.data?.map((option: { _id: string; name: string }) => ({
    id: option?._id,
    value: option?.name,
    label: option?.name,
  }));

  const starsList = stars_list?.map((innerArray: any) => {
    return innerArray?.map((option: any) => ({
      id: option._id,
      value: option.name,
      label: option.name,
    }));
  });

  return (
    <div>
      {PartnerInformation?.map((item: Details, ind) => {
        return (
          <div key={ind}>
            <Info>{item?.title}</Info>
            <Cards>
              <div style={{ width: '100%', display: 'grid', gridTemplateColumns: `${item?.rowCount}` }} key={item?.id}>
                {item?.info?.map((datas) => {
                  return (
                    <Row key={datas?.id}>
                      <Col span={6} className="name">
                        {datas?.title}
                      </Col>
                      <Col span={16}>
                        {datas?.options && (
                          <Form.Item
                            name={datas?.name}
                            rules={datas?.rules ? datas.rules.map((rule) => ({ ...rule, type: 'array' })) : []}
                          >
                            <Selectoption
                              mode={
                                datas.name !== 'PartnerDosham' &&
                                datas.name !== 'Partner_DrinkingHabits' &&
                                datas.name !== 'Partner_SmokingHabits'
                                  ? 'tags'
                                  : undefined
                              }
                              suffixIcon={<CaretDownOutlined />}
                              placeholder={datas?.placeholder}
                              onChange={datas?.name === 'PartnermoonSign' ? handleSign : handleSelect}
                              options={
                                datas?.name === 'PartnermoonSign'
                                  ? moonSignList
                                  : datas?.name === 'PartnerStar'
                                  ? starsList
                                    ? starsList.flat()
                                    : []
                                  : datas?.options
                              }
                            />
                          </Form.Item>
                        )}

                        {datas?.name === 'PartenerAge' && (
                          <Form.Item
                            style={{ width: '100%' }}
                            rules={datas?.rules ? datas.rules.map((rule) => ({ ...rule, type: 'array' })) : []}
                          >
                            <div style={{ display: 'flex', height: '0px', marginBottom: '40px' }}>
                              <Form.Item
                                style={{
                                  width: '100%',
                                }}
                                name="Agefrom"
                              >
                                <Selectoption
                                  suffixIcon={<CaretDownOutlined />}
                                  placeholder={datas?.placeholder}
                                  onChange={handleSelect}
                                  options={datas?.fromOptions}
                                />
                              </Form.Item>
                              <Form.Item
                                style={{
                                  width: '100%',
                                  marginLeft: '20px',
                                }}
                                name="Ageto"
                              >
                                <Selectoption
                                  suffixIcon={<CaretDownOutlined />}
                                  placeholder="To"
                                  options={datas?.toOptions}
                                />
                              </Form.Item>
                            </div>
                          </Form.Item>
                        )}
                        {datas?.name === 'PartnerHeight' && (
                          <Form.Item
                            style={{ width: '100%' }}
                            rules={datas?.rules ? datas.rules.map((rule) => ({ ...rule, type: 'array' })) : []}
                          >
                            <div style={{ display: 'flex', height: '0px', marginBottom: '40px' }}>
                              <Form.Item
                                style={{
                                  width: '100%',
                                }}
                                name="Heightfrom"
                              >
                                <Selectoption
                                  suffixIcon={<CaretDownOutlined />}
                                  placeholder={datas?.placeholder}
                                  options={datas?.fromOptions}
                                />
                              </Form.Item>
                              <Form.Item
                                style={{
                                  width: '100%',
                                  marginLeft: '20px',
                                }}
                                name="Heightto"
                              >
                                <Selectoption
                                  suffixIcon={<CaretDownOutlined />}
                                  placeholder="To"
                                  options={datas?.toHeight}
                                />
                              </Form.Item>
                            </div>
                          </Form.Item>
                        )}
                        {datas?.typeOfField && (
                          <Form.Item
                            name={datas?.name}
                            rules={datas?.rules ? datas.rules.map((rule) => ({ ...rule, type: 'array' })) : []}
                          >
                            <Inputbox filed={datas?.name} placeholder={datas?.placeholder} />
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                  );
                })}
              </div>
            </Cards>
          </div>
        );
      })}
    </div>
  );
};

export default PartnerData;
