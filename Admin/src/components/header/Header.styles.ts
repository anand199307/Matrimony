import styled, { css } from 'styled-components';
import { Col } from 'antd';
import { BurgerIcon } from '@app/components/common/MobileMenu/MobileMenu';
import { LAYOUT, media } from '@app/styles/themes/constants';

export const HeaderActionWrapper = styled.div`
  cursor: pointer;
  & > .ant-btn > span[role='img'],
  .ant-badge {
    font-size: 1.25rem;

    @media only screen and (${media.md}) {
      font-size: 1.625rem;
    }
  }
  & .ant-badge {
    display: inline-block;
  }
`;

export const BurgerCol = styled(Col)`
  z-index: 999;
  display: flex;
`;

export const MobileBurger = styled(BurgerIcon)`
  width: 1.75rem;
  height: 1.75rem;
  margin-right: -0.5rem;
  color: var(--text-main-color);

  ${(props) =>
    props.isCross &&
    css`
      color: var(--text-secondary-color);
    `};
`;

export const SearchColumn = styled(Col)`
  padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
`;

interface ProfileColumn {
  $isTwoColumnsLayout: boolean;
}

export const ProfileColumn = styled(Col)<ProfileColumn>`
  @media only screen and (${media.md}) {
    ${(props) =>
      props?.$isTwoColumnsLayout &&
      css`
        background-color: var(--sider-background-color);
        padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
      `}
  }
`;
