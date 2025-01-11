import React from 'react';
import * as S from './References.styles';
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

const TwitterIcon = S.withStyles(TwitterOutlined);
const FacebookIcon = S.withStyles(FacebookOutlined);
const LinkedinIcon = S.withStyles(LinkedinOutlined);

export const References: React.FC = () => {
  return (
    <S.ReferencesWrapper>
      <S.Text>
        Made by{' '}
        <a href="https://aptonworks.com" target="_blank" rel="noreferrer">
          AptonWorks{' '}
        </a>
        &copy;. in 2023
      </S.Text>
      <S.Icons>
        <a href="" target="_blank" rel="noreferrer">
          <TwitterIcon />
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <FacebookIcon />
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <LinkedinIcon />
        </a>
      </S.Icons>
    </S.ReferencesWrapper>
  );
};
