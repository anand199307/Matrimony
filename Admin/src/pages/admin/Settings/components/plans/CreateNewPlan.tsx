import React, { useState, useEffect } from 'react';
import {
  ImgSize,
  FormText,
  CouponInput,
  StarColor,
  AddCoupon,
  CardCoupon,
  Updated,
  RadioBox,
  CardUploader,
  FeatureButton,
  PlanOffer,
  FeatureInput,
  // Cards,
} from '../SettingStyled';
import { Divider, Form, Input, Select, Radio, Checkbox, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PlanFormUpdate, setActiveTab } from '@app/store/slices/settingSlice';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { notificationController } from '@app/controllers/notificationController';
import { PlanFormInfo, SetformPlanDatas } from '@app/store/slices/settingSlice';
import { IdImg } from '@app/pages/admin/Members/Request/Component/RequestStyled';
import Circlecheck from '../../../../../assets/Circle_Check.svg';

import { FormData, Datas, offertext } from './PlanFunctionality';
import { number } from 'echarts';

interface formPlanData {
  name: string;
  price: number;
  durationInMonths: number;
  contactLimit: number;
  chatOption: boolean;
  horoscopeOption: boolean;
  features: string[];
}

export const planvalues: formPlanData = {
  name: '',
  price: 0,
  durationInMonths: 0,
  contactLimit: 0,
  chatOption: true,
  horoscopeOption: true,
  features: [],
};

interface ButtonProps {
  setAddPlan: (value: boolean) => void;
}

const CreateNewPlan: React.FC<ButtonProps> = ({ setAddPlan }) => {
  const selectedFormData = useAppSelector((state) => state.data.info.formPlanDatas);
  // const [features, setFeatures] = useState<string[]>(selectedFormData.features || []);
  const [features, setFeatures] = useState<string[]>([]);

  const [currentFeature, setCurrentFeature] = useState('');

  const navigate = useNavigate();
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const onfinish = (value: any) => {
    console.log(value);
    value.features = features;
    value.price = Number(value.price);
    value.durationInMonths = Number(value.durationInMonths);
    value.contactLimit = Number(value.contactLimit);
    value.chatOption = Boolean(value.chatOption);
    value.horoscopeOption = Boolean(value.horoscopeOption);

    if (selectedFormData) {
      dispatch(
        PlanFormUpdate({
          uuid: selectedFormData?.uuid,

          planFormPayload: {
            name: value.name,
            durationInMonths: value.durationInMonths,
            price: value.price,
            contactLimit: value.contactLimit,
            chatOption: value.chatOption,
            horoscopeOption: value.horoscopeOption,
            features: value.features,
          },
          status: selectedFormData?.status,
        }),
      );
      // dispatch(PlanFormUpdate({ uuid: selectedFormData.uuid, planFormPayload: selectedFormData }));
      setAddPlan(false);
    } else {
      dispatch(PlanFormInfo(value));
      setAddPlan(false);
      console.log(setAddPlan);
    }
  };

  console.log(selectedFormData);
  const handleFeatureButtonClick = (event: any) => {
    if (currentFeature !== '') {
      setFeatures((prevFeatures: string[]) => [...prevFeatures, currentFeature]); // Provide the type for the `prevFeatures` parameter
      setCurrentFeature('');
    }
  };

  useEffect(() => {
    if (selectedFormData) {
      form.setFieldsValue({
        name: selectedFormData.name,
        price: selectedFormData.price,
        durationInMonths: selectedFormData.durationInMonths,
        contactLimit: selectedFormData.contactLimit,
        chatOption: selectedFormData.chatOption,
        horoscopeOption: selectedFormData.horoscopeOption,
        features: selectedFormData.features,
      });
      setFeatures(selectedFormData.features);
    }
  }, [selectedFormData, form]);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1>Create New Plan </h1>
          {/* <ImgSize>Lorem ipsum dolor sit amet consectetur.</ImgSize> */}
        </div>
      </div>
      <Form onFinish={onfinish} form={form}>
        {Datas.map((datas) => (
          <div key={datas.title}>
            {/* <ImgSize>Lorem ipsum dolor sit amet consectetur.</ImgSize> */}
            <CardCoupon>
              {datas?.content?.map((items, ind) => (
                <div key={ind}>
                  <FormText>
                    {items?.name}
                    <StarColor>*</StarColor>
                  </FormText>
                  <Form.Item name={items.namevalues} rules={items?.rules}>
                    <CouponInput placeholder={items.placeholder} />
                  </Form.Item>
                </div>
              ))}
            </CardCoupon>
          </div>
        ))}
        <Divider />
        <div>
          <h1>Plan Functionality </h1>
          <Form.Item name="chatOption" rules={[{ required: true, message: 'Please select a chat option' }]}>
            <Updated>
              <p>Chat Option:</p>
              <Radio.Group
                style={{ paddingLeft: '10px' }}
                defaultValue={
                  selectedFormData?.chatOption ? (selectedFormData?.chatOption ? 'true' : 'false') : undefined
                }
              >
                <RadioBox value="true">Yes</RadioBox>
                <RadioBox value="false">No</RadioBox>
              </Radio.Group>
            </Updated>
          </Form.Item>
          <Form.Item name="horoscopeOption" rules={[{ required: true, message: 'Please select a chat option' }]}>
            <CardUploader>
              <p>Heroscope view:</p>
              <Radio.Group
                style={{ paddingLeft: '10px' }}
                defaultValue={
                  selectedFormData?.horoscopeOption ? (selectedFormData?.horoscopeOption ? 'true' : 'false') : undefined
                }
              >
                <RadioBox value="true">Yes</RadioBox>
                <RadioBox value="false">No</RadioBox>
              </Radio.Group>
            </CardUploader>
          </Form.Item>
        </div>
        <Divider />
        <div>
          <h1> Plan Details </h1>
          <PlanOffer>
            <div style={{ flex: 1 }}>
              <Form.Item name="features" rules={[{ required: true, message: 'Enter your feature' }]}>
                <FeatureInput
                  placeholder="Enter plan name"
                  value={currentFeature}
                  onChange={(e) => setCurrentFeature(e.target.value)}
                />
              </Form.Item>
            </div>
            <div>
              <FeatureButton onClick={handleFeatureButtonClick}>
                <PlusOutlined />
              </FeatureButton>
            </div>
            <div style={{ flex: 1, position: 'relative', left: '40px', bottom: '10px' }}>
              {features.map((feature, index) => (
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }} key={index}>
                  <img src={Circlecheck} alt="CircleCheck" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </PlanOffer>
        </div>

        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <AddCoupon htmlType="submit">
            <h1>Add Plan</h1>
          </AddCoupon>
        </div>
      </Form>
    </div>
  );
};

export default CreateNewPlan;
