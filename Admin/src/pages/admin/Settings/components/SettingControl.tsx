import { Container, Control } from './SettingStyled';
import React, { useEffect } from 'react';
import ThemeControl from './ThemeControl/ThemeControl';
import Plans from './plans/Plans';
import PromoCode from './promocode//PromoCode';
import TeamManage from './teammanage/TeamManage';
import InvoiceManage from './invoiceManage/InvoiceManage';
import { faqSegement, setActiveTab } from '@app/store/slices/settingSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';

const SettingControl: React.FC = () => {
  const activeTab = useAppSelector((state) => state.data.info.activetab);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedActiveTab = localStorage.getItem('activeTab');
    dispatch(faqSegement());
    if (storedActiveTab) {
      dispatch(setActiveTab(storedActiveTab));
    } else {
      dispatch(setActiveTab('themecontrol'));
    }
  }, [dispatch]);

  const handleTabClick = (key: string) => {
    localStorage.setItem('activeTab', key);

    dispatch(setActiveTab(key));
  };

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  return (
    <>
      <Container>
        <div>
          <Control
            onClick={() => {
              handleTabClick('themecontrol');
            }}
            name="themecontrol"
            value={activeTab}
          >
            Website Control
          </Control>
          <Control
            onClick={() => {
              handleTabClick('plans');
            }}
            name="plans"
            value={activeTab}
          >
            Plans
          </Control>
          {/* <Control
            onClick={() => {
              handleTabClick('promocode');
            }}
            name="promocode"
            value={activeTab}
          >
            Promo Code
          </Control> */}
          {userInfo?.data?.role === 'admin' && (
            <Control
              onClick={() => {
                handleTabClick('teammanage');
              }}
              name="teammanage"
              value={activeTab}
            >
              Team Manage
            </Control>
          )}
          {/* <Control
            onClick={() => {
              handleTabClick('invoicemanage');
            }}
            name="invoicemanage"
            value={activeTab}
          >
            Invoice manage
          </Control> */}
        </div>
      </Container>
      {/* {activeTab === 'themecontrol' ? <ThemeControl /> : ''} */}
      {activeTab === 'themecontrol' ? (
        <ThemeControl />
      ) : activeTab === 'plans' ? (
        <Plans />
      ) : activeTab === 'promocode' ? (
        <PromoCode />
      ) : activeTab === 'teammanage' ? (
        <TeamManage />
      ) : activeTab === 'invoicemanage' ? (
        <InvoiceManage />
      ) : null}
    </>
    // </Container>
  );
};

export default SettingControl;
