import React from 'react';
import { ControlTheme, VerticleScroll } from '../SettingStyled';
import CardTheme from './CardTheme';
import SuccessStories from './SuccessStories';
import FAQSection from './FAQSection';

const ThemeControl: React.FC = () => {
  return (
    <ControlTheme>
      <div>
        <CardTheme />
      </div>
      <VerticleScroll>
        <SuccessStories />

        <FAQSection />
      </VerticleScroll>
    </ControlTheme>
  );
};

export default ThemeControl;
