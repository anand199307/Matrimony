import React from 'react';
import {
  SectionAbout,
  ImgSize,
  DeviceText,
  CardUploader,
  UploaderButton,
  UploadImg,
  Textlink,
  Boxlink,
  AboutBox,
  UpdateBox,
  MobileUplader,
} from '../SettingStyled';
import UploderImg from '../../../../../assets/Group 21.png';
import { Upload, Card } from 'antd';


const AboutSection: React.FC = () => {
  return (
    <SectionAbout id="aboutSection">
      <h1>About</h1>
      <ImgSize>image displayed on top of your about section.</ImgSize>
      <DeviceText>Image</DeviceText>
      <div>
        <CardUploader>
          <MobileUplader>{/* <UploaderImage /> */}</MobileUplader>
          {/* <Textlink>Link image</Textlink>
          <Boxlink>https://example.com/banner.pnj</Boxlink> */}
        </CardUploader>
      </div>
      <DeviceText>About Text</DeviceText>
      {/* <AboutBox>Description</AboutBox> */}
      <AboutBox placeholder="Description" />
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <UpdateBox>Update</UpdateBox>
      </div>
    </SectionAbout>
  );
};

export default AboutSection;
