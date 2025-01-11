import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Info,
  Cards,
  Inputbox,
  Selectoption,
  RadioButtons,
  MemberButton,
  CancelButton,
  Roy,
  Profile,
  FormInputPassword,
  PassButton,
  InputConfirmPassword,
} from './FormStyled';
import { OnboardingApi, UploadID } from '@app/store/slices/addMember';
import { generatePassword, handleFileChange, setFormFields } from './FromDataFunctions';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { AddMemberButton } from '@app/pages/admin/Members/AllMembers/components/MembersStyled';
import * as S from '../../../pages/admin/MemberInfo/Member.styles';
import { Form, Row, Col, Radio, Tooltip } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { ReactComponent as UploaderIcon } from '@app/assets/icons/FileUpload.svg';
import { ReactComponent as ProfileIcon } from '@app/assets/icons/user-circle.svg';
import { ReactComponent as CaretDownOutlined } from '@app/assets/icons/Vector.svg';
import { ReactComponent as DownOutlined } from '@app/assets/icons/Chevron_Circle_Down.svg';
import { RegisterApi, citylist, countryList, uploadedimage, getImage } from '@app/store/slices/addMember';
import { handlePopupScroll } from './FromDataFunctions';
import {
  cast_list,
  education_list,
  motherTounges,
  religiuosList,
  dhosamData,
  starData,
  listOccupation,
} from '@app/store/slices/addMember';
import { Details, stateProps, Information } from './Partners Preferences/PartnerInfoData';
import { MainDiv, Main, Down, Downsecond } from './Partners Preferences/preferences.styles';
import PartnerData from './Partners Preferences/PartnerData';
import { FormSUbmission } from './FromDataFunctions';
import { CurrencyOptions } from './Formdata';
import { useNavigate } from 'react-router-dom';
import { notificationController } from '@app/controllers/notificationController';
import { slectedIdCard, selectedMoonSign } from '@app/store/slices/addMember';
import { updateMember } from '@app/store/slices/addMember';
import { CloseCircleOutlined } from '@ant-design/icons';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const AddMemberForm = ({ details, PartnerInformation }: { details: Information[]; PartnerInformation?: Details[] }) => {
  const [Radiovalue, setValue] = useState();
  const [profile, setProfile] = useState<string | null>();
  const state_list = useAppSelector((state) => state.form.selectStates);
  const list_of_languages = useAppSelector((state) => state.form.languages);
  const star_list = useAppSelector((state) => state.form.stars);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [stateId, setStateId] = useState<string>();
  const dispatch = useAppDispatch();
  const [profileList, setProfileList] = useState();
  const [toggle, setToggle] = useState(false);
  const [randompassword, setRandomPassword] = useState<string>('');
  const [genderValue, setGenderValue] = useState(null);
  const [doshamValue, setDoshamValue] = useState(null);
  const [childrenValue, setChildrenValue] = useState(null);
  const [docList, setDocumentList] = useState<File | undefined>(undefined);
  const [idCard, setIDCard] = useState<string | null>();

  const languagesdOptions = list_of_languages?.data?.map((option) => ({
    id: parseInt(option._id),
    value: option?.name,
    label: option?.name,
  }));

  // console.log(languagesdOptions);
  const [options, setOptions] = useState(languagesdOptions);
  const [form] = Form.useForm();
  const memberInfo = useAppSelector((state) => state.member.info);
  const info = memberInfo?.userProfile;
  const selectdUser = useAppSelector((state) => state.member.basicInfo);
  const [maritalStatus, setMaritalStatus] = useState<string>();
  const register = useAppSelector((state) => state.form.register);

  useEffect(() => {
    if (page && limit) {
      dispatch(motherTounges({ page: page, limit: limit }));
      dispatch(listOccupation({ page: page, limit: limit }));
    }
    dispatch(religiuosList());
    dispatch(cast_list());
    dispatch(education_list());
    dispatch(countryList());
    dispatch(dhosamData());
    dispatch(starData());
    setProfile(selectdUser?.galleryPhoto[0]);
    setIDCard(selectdUser?.userVerificationDetails?.idDoc);
  }, [dispatch, page, limit, selectdUser]);

  const onFinish = (values: Information) => {
    FormSUbmission({
      values,
      dispatch,
      RegisterApi,
      OnboardingApi,
      notificationController,
      navigate,
      info,
      updateMember,
      register,
      profile,
      idCard,
    });
  };

  const navigate = useNavigate();
  const url = useAppSelector((state) => state.form.url);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange({
      event,
      uploadedimage,
      dispatch,
      setProfileList,
    });
  };

  useEffect(() => {
    const list = [...options, ...languagesdOptions];
    const uniqueList = list.filter((item, index) => {
      const jsonItem = JSON.stringify(item);
      return index === list.findIndex((obj) => JSON.stringify(obj) === jsonItem);
    });

    setOptions(uniqueList);
  }, [dispatch, list_of_languages, languagesdOptions, options]);

  useEffect(() => {
    if (stateId) {
      dispatch(citylist(stateId));
    }
  }, [dispatch, stateId]);

  const handleSelect = (value: any) => {
    state_list?.data.filter((item: stateProps) => {
      if (item?.name === value) {
        setStateId(item?.uuid);
      }
    });
  };
  const handleSign = (value: string | any) => {
    star_list?.data?.filter((item: stateProps) => {
      if (item?.name === value) {
        dispatch(selectedMoonSign(item?.startDetails));
      }
    });
  };

  const handleMaritalStatus = (value: string | any) => {
    setMaritalStatus(value);
  };
  const handleSelectID = (value: any) => {
    dispatch(slectedIdCard(value));
  };

  const selectedIdType = useAppSelector((state) => state.form.type);

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      setDocumentList(file);
      dispatch(UploadID(selectedIdType ? selectedIdType : selectdUser?.userVerificationDetails?.idType));
    }
  };
  const docUrl = useAppSelector((state) => state.form.card);
  useEffect(() => {
    if (url && profileList) {
      const file: File = profileList;
      setProfile(url?.url?.split('?').shift());
      dispatch(getImage(url as string, file));
    }
    if (docUrl && docList) {
      const file: File = docList;
      dispatch(getImage(docUrl as string, file));
      setIDCard(docUrl?.url?.split('?').shift());
    }
  }, [dispatch, url, profileList, docUrl, docList]);
  useEffect(() => {
    if (info && selectdUser) {
      setFormFields({ form, info, selectdUser });
      setToggle(true);
    }
  }, [form, info, selectdUser]);

  const defaultValueFormatted = dayjs('00:00', 'HH:mm').format('HH:mm A');

  return (
    <>
      <S.StyledDIv>
        <div className="wrapper"></div>
      </S.StyledDIv>
      <Form form={form} onFinish={onFinish}>
        {details?.map((item: Information) => {
          const onChange = (e: RadioChangeEvent, datas: Information) => {
            setValue(e.target.value);
            const value = e.target.value;

            if (datas?.name === 'Gender') {
              setGenderValue(value);
            } else if (datas?.name === 'Dosham') {
              setDoshamValue(value);
            } else if (datas?.name === 'Childrens') {
              setChildrenValue(value);
            }
          };

          return (
            <>
              <Info>{item?.title}</Info>
              <Cards>
                <div
                  style={{ width: '100%', display: 'grid', gridTemplateColumns: `${item?.rowCount}` }}
                  key={item?.id}
                >
                  {item?.info?.map((datas, index) => {
                    return (
                      <Row key={`${datas?.id}${index}`}>
                        <Col span={6} className="name">
                          {datas?.title}
                        </Col>
                        <Col span={16} className="formfields">
                          {datas?.RadioButtons && (
                            <Form.Item name={datas?.name} rules={datas?.SelectRules}>
                              <div style={{ display: 'flex' }}>
                                {datas.RadioButtons?.map((item, ind) => {
                                  return (
                                    <Radio.Group
                                      onChange={(e) => onChange(e, datas)}
                                      key={ind}
                                      value={
                                        datas?.name === 'Gender'
                                          ? genderValue
                                            ? genderValue
                                            : selectdUser?.gender
                                          : datas?.name === 'Dosham'
                                          ? doshamValue
                                            ? doshamValue
                                            : selectdUser?.religionDetails?.dosham === 'None'
                                            ? 'No'
                                            : selectdUser?.religionDetails?.dosham
                                          : datas?.name === 'Childrens'
                                          ? childrenValue
                                            ? childrenValue
                                            : selectdUser?.religionDetails?.children === 'None' ||
                                              maritalStatus === 'Never Married' ||
                                              (selectdUser?.religionDetails?.maritalStatus === 'Never Married' && 'No')
                                          : ''
                                      }
                                    >
                                      <RadioButtons value={item?.value}>{item?.label}</RadioButtons>
                                    </Radio.Group>
                                  );
                                })}
                                {datas?.name === 'Dosham' && (
                                  <Form.Item
                                    name="Dosham_Name"
                                    rules={datas?.SelectRules}
                                    style={{
                                      width: '100%',
                                    }}
                                  >
                                    <Selectoption
                                      disabled={doshamValue === 'No' || datas?.defaultvalue === 'No' ? true : false}
                                      suffixIcon={<CaretDownOutlined />}
                                      placeholder={datas?.placeholder}
                                      style={{
                                        width: '100%',
                                      }}
                                      options={datas?.options}
                                    />
                                  </Form.Item>
                                )}
                                {datas?.name === 'Childrens' && (
                                  <Form.Item
                                    name="Children_count"
                                    //rules={datas?.SelectRules}
                                    style={{
                                      width: '100%',
                                    }}
                                  >
                                    <Selectoption
                                      disabled={
                                        childrenValue === 'No' ||
                                        datas?.defaultvalue === 'No' ||
                                        maritalStatus === 'Never Married'
                                          ? true
                                          : false
                                      }
                                      suffixIcon={<CaretDownOutlined />}
                                      placeholder={datas?.placeholder}
                                      options={datas?.options}
                                    />
                                  </Form.Item>
                                )}
                              </div>
                            </Form.Item>
                          )}

                          {datas?.title &&
                            datas?.options &&
                            datas?.title !== 'Annual Income' &&
                            datas?.title !== 'Currency' &&
                            datas?.title !== 'Dosham' &&
                            datas?.title !== 'Childrens' &&
                            datas?.name !== 'Select_ID' && (
                              <Form.Item name={datas.name} rules={datas?.SelectRules}>
                                <Selectoption
                                  onChange={
                                    datas?.name === 'moonSign'
                                      ? handleSign
                                      : datas?.title === 'Marital Status'
                                      ? handleMaritalStatus
                                      : handleSelect
                                  }
                                  options={datas.options}
                                  suffixIcon={<CaretDownOutlined />}
                                  placeholder={datas?.placeholder}
                                  onPopupScroll={(e) =>
                                    datas?.title === 'Mother Tongue' ||
                                    datas?.name === 'Caste' ||
                                    (datas?.name === 'PartnerCaste' &&
                                      handlePopupScroll({
                                        e,
                                        setLoadingMore,
                                        loadingMore,
                                        motherTounges,
                                        dispatch,
                                        page,
                                        setLimit,
                                        setPage,
                                        limit,
                                      }))
                                  }
                                  style={{
                                    width:
                                      datas?.title === 'Mobile Number'
                                        ? '12%'
                                        : datas?.title === 'Dosham'
                                        ? '80%'
                                        : datas?.title === 'Annual Income'
                                        ? '15%'
                                        : datas?.title === 'Number of Sisters'
                                        ? '45%'
                                        : datas?.title === 'Number of Brothers'
                                        ? '50%'
                                        : '100%',
                                  }}
                                />
                              </Form.Item>
                            )}
                          {datas?.name === 'Select_ID' && (
                            <Form.Item name={datas?.name} rules={datas?.SelectRules}>
                              <Selectoption
                                onChange={handleSelectID}
                                options={datas?.options}
                                suffixIcon={<CaretDownOutlined />}
                                placeholder={datas?.placeholder}
                                style={{
                                  width: '100%',
                                }}
                              />
                            </Form.Item>
                          )}
                          {((datas?.typeOfField && datas?.typeOfField !== 'Picker') || datas?.Password) && (
                            <Form.Item
                              name={datas?.name}
                              rules={datas?.rules ? datas.rules.map((rule) => ({ ...rule, type: 'array' })) : []}
                            >
                              <div style={{ display: 'flex' }}>
                                {datas?.title === 'Mobile Number' && <div className="Mcode">+91</div>}

                                {datas?.Password ? (
                                  <FormInputPassword
                                    value={`${randompassword}`}
                                    placeholder={datas?.placeholder}
                                    suffix={
                                      <PassButton onClick={() => generatePassword({ form, setRandomPassword })}>
                                        Generate
                                      </PassButton>
                                    }
                                  />
                                ) : (
                                  datas?.name !== 'AnnualIncome' && (
                                    <Inputbox
                                      filed={datas?.title}
                                      placeholder={datas?.placeholder}
                                      defaultValue={datas?.defaultvalue}
                                    />
                                  )
                                )}
                              </div>
                            </Form.Item>
                          )}

                          {datas?.title === 'Annual Income' && (
                            <Form.Item style={{ width: '100%', height: '0px' }}>
                              <div style={{ display: 'flex' }}>
                                <Form.Item
                                  name="Currency"
                                  rules={[{ required: true, message: 'Please select a currency' }]}
                                  style={{ width: '20%' }}
                                >
                                  <Selectoption
                                    suffixIcon={<CaretDownOutlined />}
                                    placeholder={CurrencyOptions?.find((data) => data?.id === 1)?.label}
                                    options={CurrencyOptions}
                                  />
                                </Form.Item>
                                <Form.Item name="AnnualIncome" style={{ marginLeft: '20px', width: '100%' }}>
                                  <Inputbox
                                    filed={datas?.title}
                                    placeholder="Annual Income"
                                    defaultValue={datas?.defaultvalue}
                                    style={{ width: '100%' }}
                                  />
                                </Form.Item>
                              </div>
                            </Form.Item>
                          )}
                          {datas?.title === 'Password Confirmation' && (
                            <Form.Item
                              name="Password Confirmation"
                              rules={[
                                { required: true, message: 'Please enter your confirm-password' },
                                ({ getFieldValue }) => ({
                                  validator(_rule, value) {
                                    if (!value || getFieldValue('Password') === value) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject('These passwords didn’t match. Try again');
                                  },
                                }),
                              ]}
                            >
                              <InputConfirmPassword size="middle" placeholder="Confirm Password" />
                            </Form.Item>
                          )}
                          {datas?.title === 'Upload ID' && (
                            <Form.Item name={datas?.name} rules={datas?.SelectRules}>
                              <div style={{ display: 'flex', alignItems: 'space-between' }}>
                                <div style={{ width: '20%' }}>
                                  {idCard ? (
                                    <div style={{ width: '80px', height: '70px' }}>
                                      <span
                                        onClick={() => {
                                          setIDCard(null);
                                        }}
                                        style={{
                                          cursor: 'pointer',
                                          position: 'absolute',
                                          zIndex: '2',
                                          top: '-13px',
                                          left: '70px',
                                        }}
                                      >
                                        <CloseCircleOutlined />
                                      </span>
                                      {idCard && (
                                        <img
                                          src={idCard}
                                          alt="noID image"
                                          width="100%"
                                          height="100%"
                                          style={{ objectFit: 'fill', borderRadius: '10px', opacity: '0.9' }}
                                        />
                                      )}
                                    </div>
                                  ) : (
                                    <Tooltip title={!selectedIdType && 'Please select ID type'}>
                                      <Roy>
                                        <label className="custom-file-upload">
                                          <input
                                            className="input"
                                            type="file"
                                            onChange={handleIdChange}
                                            accept=".png"
                                            disabled={
                                              selectedIdType || selectdUser?.userVerificationDetails?.idType
                                                ? false
                                                : true
                                            }
                                          />

                                          <UploaderIcon />
                                        </label>
                                      </Roy>
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                            </Form.Item>
                          )}
                          {datas?.title === 'Profile Photo' && (
                            <Form.Item name={datas?.name} rules={datas?.SelectRules}>
                              <div style={{ display: 'flex', alignItems: 'space-between' }}>
                                <div style={{ width: '20%' }}>
                                  {profile ? (
                                    <div style={{ width: '80px', height: '70px' }}>
                                      <span
                                        onClick={() => {
                                          setProfile(null);
                                        }}
                                        style={{
                                          cursor: 'pointer',
                                          position: 'absolute',
                                          zIndex: '2',
                                          top: '-13px',
                                          left: '70px',
                                        }}
                                      >
                                        <CloseCircleOutlined />
                                      </span>
                                      {profile && (
                                        <img
                                          src={profile}
                                          alt="noProfile image"
                                          width="100%"
                                          height="100%"
                                          style={{ objectFit: 'fill', borderRadius: '10px', opacity: '0.9' }}
                                        />
                                      )}
                                    </div>
                                  ) : (
                                    <Profile>
                                      <label className="custom-file-upload">
                                        <input
                                          className="input"
                                          type="file"
                                          onChange={handlePhotoChange}
                                          accept=".png"
                                        />

                                        <ProfileIcon />
                                      </label>
                                    </Profile>
                                  )}
                                </div>
                              </div>
                            </Form.Item>
                          )}
                          {datas?.SibCountOptions && (
                            <Form.Item style={{ width: '100%', height: '40px' }}>
                              <div style={{ display: 'flex' }}>
                                <Form.Item
                                  name={datas?.name}
                                  //rules={[{ required: true, message: 'Please select a  value' }]}
                                  style={{ width: '100%' }}
                                >
                                  <Selectoption
                                    suffixIcon={<CaretDownOutlined />}
                                    placeholder={datas?.placeholder}
                                    options={datas?.SibCountOptions}
                                  />
                                </Form.Item>
                                <Form.Item name={datas?.count} style={{ marginLeft: '20px', width: '100%' }}>
                                  <Selectoption
                                    suffixIcon={<CaretDownOutlined />}
                                    placeholder="--No.of Married--"
                                    options={datas?.SibCountOptions}
                                  />
                                </Form.Item>
                              </div>
                            </Form.Item>
                          )}

                          {datas?.typeOfField === 'Picker' && (
                            <Form.Item name={datas?.name} rules={datas?.SelectRules}>
                              <TimePicker
                                style={{ width: '100%', height: '40px' }}
                                format={'HH:mm A'}
                                defaultValue={dayjs(defaultValueFormatted, 'HH:mm A')}
                              />
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              </Cards>
            </>
          );
        })}

        {!toggle ? (
          <Cards style={{ marginTop: '40px' }}>
            <MainDiv>
              <div>Partner preferences</div>
              <Down onClick={() => setToggle(!toggle)}>
                <DownOutlined />
              </Down>
            </MainDiv>
          </Cards>
        ) : (
          <>
            <Main style={{ padding: '20px 40px 10px 0px' }}>
              <Info>Partner preferences</Info>
              <Downsecond onClick={() => setToggle(!toggle)}>
                <DownOutlined />
              </Downsecond>
            </Main>
            <PartnerData PartnerInformation={PartnerInformation} />
          </>
        )}

        <MemberButton>
          <CancelButton>cancel</CancelButton>
          <AddMemberButton style={{ margin: '30px 20px 0px 20px' }} htmlType="submit">
            Add Member
          </AddMemberButton>
        </MemberButton>
      </Form>
    </>
  );
};

export default AddMemberForm;
