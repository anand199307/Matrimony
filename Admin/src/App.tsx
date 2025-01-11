import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { themeObject } from './styles/themes/themeVariables';
import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import { useThemeWatcher } from './hooks/useThemeWatcher';
import { setTheme } from './store/slices/themeSlice';
import { ConfigProvider } from 'antd';
import { AppRouter } from './components/router/AppRouter';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  dispatch(setTheme('light'));
  const theme = useAppSelector((state) => state.theme.theme);
  const user = useAppSelector((state) => state.user.user);
  const token = user ? user : null;
  useThemeWatcher();

  return (
    <>
      <meta name="theme-color" content={themeObject[theme].primary} />
      <GlobalStyle />
      <ConfigProvider>
        <AppRouter authToken={token as unknown as string} />
      </ConfigProvider>
    </>
  );
};

export default App;
