import React from 'react';
import { ValidCard, CheckBoxCard, ButtonCoupon } from '../SettingStyled';

interface ButtonProps {
  setAddCupon: (value: boolean) => void;
}

const Couponfunctionality: React.FC<ButtonProps> = ({ setAddCupon }) => {
  return (
    <div>
      <h1>Coupon Functionality </h1>
      <ValidCard>
        <CheckBoxCard />
        <h4>Valid only for online payments</h4>
      </ValidCard>
      <ValidCard>
        <CheckBoxCard />
        <h4>Valid only for new payments</h4>
      </ValidCard>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <ButtonCoupon
          onClick={() => {
            setAddCupon(false);
          }}
        >
          <h1>Create coupon</h1>
        </ButtonCoupon>
      </div>
    </div>
  );
};

export default Couponfunctionality;
