import React, { useState } from 'react';
import { CardAns, CardQque, CardUploader, FeatureButton, ImgSize } from '../SettingStyled';

// items: { question: string; answer: string }[];

const Accordion: React.FC<string | any> = ({ items }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`accordion ${isActive ? 'show' : ''}`} onClick={() => setIsActive(!isActive)}>
      <CardQque>
        <ImgSize>{items?.question}</ImgSize>
        <FeatureButton>{isActive ? '-' : '+'}</FeatureButton>
      </CardQque>
      {isActive && <CardAns>{items?.answer}</CardAns>}
    </div>
  );
};

export default Accordion;
