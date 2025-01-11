import React, { useState, useEffect } from 'react';
import PlanTable from './PlanTable';
import { AddPlanCard } from '../SettingStyled';
import AddPlanButton from './AddPlanButton';
import Planform from './Planform';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { PlanInfo } from '@app/store/slices/settingSlice';
import PlanData from './PlanData';

const Plans: React.FC = () => {
  const [addPlan, setAddPlan] = useState(false);
  const dispatch = useDispatch<any>();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(PlanInfo(currentPage));
  }, [dispatch, currentPage]);

  return (
    <>
      <div>
        {addPlan ? (
          <Planform setAddPlan={setAddPlan} />
        ) : (
          <AddPlanCard>
            <AddPlanButton setAddPlan={setAddPlan} />
            <PlanData setAddPlan={setAddPlan} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </AddPlanCard>
        )}
      </div>
    </>
  );
};

export default Plans;
