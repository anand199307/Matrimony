/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import MainNavigator from './src/navigation/index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

//redux
import {Provider} from 'react-redux';
import store from './src/redux/store';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
