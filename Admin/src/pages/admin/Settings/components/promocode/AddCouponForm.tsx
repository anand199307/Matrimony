import React from 'react';
import CreateCouponButton from './CreateCouponButton';
import { CouponCard } from '../SettingStyled';
import Couponfunctionality from './Couponfunctionality';

interface ButtonProps {
  setAddCupon: (value: boolean) => void;
}

const AddCouponForm: React.FC<ButtonProps> = ({ setAddCupon }) => {
  return (
    <CouponCard>
      <CreateCouponButton setAddCupon={setAddCupon} />
      <Couponfunctionality setAddCupon={setAddCupon} />
    </CouponCard>
  );
};
export default AddCouponForm;
