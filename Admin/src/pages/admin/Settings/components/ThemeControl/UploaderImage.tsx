import React from 'react';
import { UploadImg, MobileUplader } from '../SettingStyled';
import { Profile } from '@app/components/common/forms/FormStyled';
import UploderImg from '../../../../../assets/Group 21.png';
import { CloseCircleOutlined } from '@ant-design/icons';

type Props = {
  storyUrl: any;
  setStoryUrl: React.Dispatch<React.SetStateAction<string[] | null>>;
  handleFileChange: (event: any) => void;
};

const UploaderImage = ({ storyUrl, setStoryUrl, handleFileChange }: Props) => {
  return (
    <div style={{ position: 'relative' }}>
      {storyUrl ? (
        <div style={{ width: '80px', height: '70px' }}>
          <span
            onClick={() => setStoryUrl(null)}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              zIndex: '2',
              top: '0px',
              left: '70px',
            }}
          >
            <CloseCircleOutlined />
          </span>
          <MobileUplader>
            <img
              src={storyUrl}
              alt="no image"
              width="100%"
              height="100%"
              style={{ objectFit: 'fill', borderRadius: '10px', opacity: '0.9' }}
            />
          </MobileUplader>
        </div>
      ) : (
        <Profile>
          <label className="custom-file-upload">
            <input className="input" type="file" onChange={handleFileChange} accept=".png" />

            <UploadImg src={UploderImg} alt="UploadedImg" />
          </label>
        </Profile>
      )}
    </div>
  );
};

export default UploaderImage;
