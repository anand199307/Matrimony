import React from 'react';
import { AddButton } from '../SettingStyled';
import CashIcon from '../../../../../assets/cash 1.png';
import { Divider } from 'antd';

interface ButtonProps {
  setAddPlan: (value: boolean) => void;
}

const AddPlanButton: React.FC<ButtonProps> = ({ setAddPlan }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1>Plan Setting</h1>
          {/* <ImgSize>Lorem ipsum dolor sit amet consectetur.</ImgSize> */}
        </div>
        <div>
          <AddButton
            onClick={() => {
              setAddPlan(true);
            }}
          >
            <img src={CashIcon} alt="DiscountIcon" />
            Add Plan
          </AddButton>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default AddPlanButton;
