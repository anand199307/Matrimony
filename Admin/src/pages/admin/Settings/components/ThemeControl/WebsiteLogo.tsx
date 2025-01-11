import React from 'react';
import {
  WebsiteLogoCard,
  UpdateLogo,
  UploaderButton,
  Updated,
  ImgSize,
  CardColor,
  LogoDesign,
  CardUploader,
  UploadIcon,
} from '../SettingStyled';
import UploderImg from '../../../../../assets/Group 21.png';
import ColorCard from '../../../../../assets/Top bar 1.svg';
import logo from '../../../../../assets/logo.png';

const WebsiteLogo: React.FC = () => {
  return (
    <WebsiteLogoCard id="headerfavicone">
      <div>
        <h1>Website logo</h1>
        <Updated>
          <UploadIcon
            accept=".jpg,.jpeg,.png" // Optional: Specify allowed file types
            beforeUpload={() => false} // Optional: Disable automatic file upload
          >
            <UploaderButton>
              <img src={UploderImg} alt="UploderImg" />
              Add Logo
            </UploaderButton>
          </UploadIcon>
          <UpdateLogo>Update Logo</UpdateLogo>
        </Updated>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h1>Favicon</h1>
        <ImgSize>Favicon should be a square and at least 48px*48px.</ImgSize>
        <CardUploader>
          <CardColor src={ColorCard} alt="ColorCard" />
          <LogoDesign src={logo} alt="logo" />
          <UpdateLogo>Update Logo</UpdateLogo>
        </CardUploader>
      </div>
    </WebsiteLogoCard>
  );
};

export default WebsiteLogo;
