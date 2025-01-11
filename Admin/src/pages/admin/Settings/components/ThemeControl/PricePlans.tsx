import React from 'react';
import { PlanPrice, ImgSize, DeviceText, CardPlan, SuccessCard, UpdateBox } from '../SettingStyled';

const PricePlans: React.FC = () => {
  const Plancard = [
    { id: 1, plan: 'Plan 1' },
    { id: 2, plan: 'Plan 2' },
    { id: 3, plan: 'Plan 3' },
  ];

  return (
    <PlanPrice id="priceplans">
      <h1>Price & Plans</h1>
      <ImgSize>Lorem ipsum dolor sit amet consectetur.</ImgSize>
      <SuccessCard>
        {Plancard.map((index) => (
          <div key={index.id}>
            <DeviceText>{index.plan}</DeviceText>
            {/* <CardPlan>Price Amount</CardPlan> */}
            <CardPlan placeholder="Price Amount" />
          </div>
        ))}
      </SuccessCard>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <UpdateBox>Update</UpdateBox>
      </div>
    </PlanPrice>
  );
};

export default PricePlans;
