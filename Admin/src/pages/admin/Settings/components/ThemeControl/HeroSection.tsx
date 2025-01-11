import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { message, Upload, Button } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
// import UploaderImage from './UploaderImage';

import {
  SectionCard,
  ImgSize,
  DesktopUploader,
  DeviceText,
  Updated,
  UploaderButton,
  Boxlink,
  CardUploader,
  Textlink,
  BannerBox,
  UpdateBox,
  MobileUplader,
} from '../SettingStyled';
import { Profile } from '@app/components/common/forms/FormStyled';
import { RegisterApi, citylist, countryList, uploadedimage, getImage } from '@app/store/slices/addMember';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';

const HeroSection: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState<string>();
  // const navigate = useNavigate();
  // const [profile, setProfile] = useState('');
  // const [profilelist, setProfileList] = useState();
  // const dispatch = useAppDispatch();
  // const url = useAppSelector((state) => state.form.url);
  const registerResponse = useAppSelector((state) => state.form.register);
  return (
    <SectionCard id="heroSection">
      <h1>Hero Section</h1>
      <ImgSize>banners displayed on top of your homepage.</ImgSize>
      <DeviceText>For Desktop</DeviceText>
      <CardUploader>
        <DesktopUploader>{/* <UploaderImage /> */}</DesktopUploader>
        {/* <Textlink>Link Banner</Textlink>
        <Boxlink>https://example.com/banner.pnj</Boxlink> */}
      </CardUploader>
      <DeviceText>For Mobile</DeviceText>
      <CardUploader>
        <MobileUplader>{/* <UploaderImage /> */}</MobileUplader>
        {/* <Textlink>Link Banner</Textlink>
        <Boxlink>https://example.com/banner.pnj</Boxlink> */}
      </CardUploader>
      <DeviceText>Hero Content</DeviceText>
      <BannerBox placeholder="banner content" />
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <UpdateBox>Update</UpdateBox>
      </div>
    </SectionCard>
  );
};

export default HeroSection;
