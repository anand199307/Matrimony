import React from 'react';
import PlanTable from './PlanTable';

export interface planUser {
  id: string;
  uuid: string;
  name: string;
  price: string;
  features: [];
  durationInMonths: string;
  contactLimit: string;
  status: any;
  chatOption: string;
  horoscopeOption: string;
}

interface ButtonProps {
  setAddPlan: (value: boolean) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const PlanData: React.FC<ButtonProps> = ({ setAddPlan, currentPage, setCurrentPage }) => {
  return <PlanTable setAddPlan={setAddPlan} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
};

export default PlanData;
