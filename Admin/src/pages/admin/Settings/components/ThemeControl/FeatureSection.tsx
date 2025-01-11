import React from 'react';
import {
  SectionFeature,
  DeviceText,
  FeatureCard,
  UploadImg,
  ImgSize,
  CardFeature,
  CardUploader,
  UpdateBox,
} from '../SettingStyled';
import UploderImg from '../../../../../assets/Group 21.png';
import { Upload } from 'antd';

const FeatureSection: React.FC = () => {
  const FeatureInfo = [
    { id: 1, feature: 'Feature 1' },
    { id: 2, feature: 'Feature 1' },
    { id: 3, feature: 'Feature 1' },
  ];

  return (
    <SectionFeature id="sectionfeatures">
      <h1>Features</h1>
      <ImgSize>images displayed on top of your Features section.</ImgSize>
      {FeatureInfo.map((index) => (
        <div key={index.id}>
          <DeviceText>{index.feature}</DeviceText>
          <CardUploader>
            <Upload accept=".pdf,.doc,.docx" beforeUpload={() => false}>
              <FeatureCard>
                <UploadImg src={UploderImg} alt="UploderImg" />
              </FeatureCard>
            </Upload>
            <div>
              {/* <CardFeature>Header text</CardFeature> */}
              <CardFeature placeholder="Header text" />
              <CardFeature placeholder="Description text" />
              {/* <CardFeature>Description text</CardFeature> */}
            </div>
          </CardUploader>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <UpdateBox>Update</UpdateBox>
      </div>
    </SectionFeature>
  );
};

export default FeatureSection;
