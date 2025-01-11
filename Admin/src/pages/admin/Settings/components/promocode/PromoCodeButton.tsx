import React from 'react';
import { ImgSize, PromoButton } from '../SettingStyled';
import DiscountIcon from '../../../../../assets/Discount.png';
import { Divider } from 'antd';

interface ButtonProps {
  setAddCupon: any;
  // addCoupon: boolean;
}
const PromoCodeButton: React.FC<ButtonProps> = ({ setAddCupon }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1>Promo Code</h1>
          <ImgSize>Lorem ipsum dolor sit amet consectetur.</ImgSize>
        </div>
        <div>
          <PromoButton
            onClick={() => {
              setAddCupon(true);
            }}
          >
            <img src={DiscountIcon} alt="DiscountIcon" />
            <h1>Add Coupons</h1>
          </PromoButton>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default PromoCodeButton;
