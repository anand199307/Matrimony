import { Button, Card } from 'antd';
import React, { useState } from 'react';
import { PromoCard } from '../SettingStyled';
import PromoCodeTable from './PromoCodeTable';
import PromoCodeButton from './PromoCodeButton';
import AddCouponForm from './AddCouponForm';
import { PromoButton } from '../SettingStyled';

const PromoCode: React.FC = () => {
  const [addCoupon, setAddCupon] = useState(false);
  return (
    <div>
      {addCoupon ? (
        <AddCouponForm setAddCupon={setAddCupon} />
      ) : (
        <PromoCard>
          <PromoCodeButton setAddCupon={setAddCupon} />
          <PromoCodeTable />
        </PromoCard>
      )}
    </div>
  );
};

export default PromoCode;
