import React, { useState } from 'react';
import { ControlText, ControlCard } from '../SettingStyled';

const CardTheme: React.FC = () => {
  const [activeScroll, SetActiveScroll] = useState('successstories');

  const handleScrollTab = (key: string) => {
    SetActiveScroll(key);
  };

  return (
    <div>
      <ControlCard>
        <ControlText
          onClick={() => handleScrollTab('successstories')}
          name="successstories"
          value={activeScroll}
          href="#successstories"
        >
          Success stories
        </ControlText>

        <ControlText
          onClick={() => handleScrollTab('faqsection')}
          name="faqsection"
          value={activeScroll}
          href="#faqsection"
        >
          FAQ
        </ControlText>
      </ControlCard>
    </div>
  );
};

export default CardTheme;
