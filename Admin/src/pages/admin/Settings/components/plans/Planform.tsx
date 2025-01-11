import React from 'react';
import CreateNewPlan from './CreateNewPlan';
import { PlanCard } from '../SettingStyled';

interface ButtonProps {
  setAddPlan: (value: boolean) => void;
}

const Planform: React.FC<ButtonProps> = ({ setAddPlan }) => {
  return (
    <PlanCard>
      <CreateNewPlan setAddPlan={setAddPlan} />
    </PlanCard>
  );
};

export default Planform;
