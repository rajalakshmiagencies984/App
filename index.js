/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';

import { MD3LightTheme as DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './src/reducers/index'


export default function Main() {
    const theme= {
    ...DefaultTheme,
    colors: {
       ...DefaultTheme.colors,
        primary: '#212529',
        
  },
}
  return (
  <Provider store={store}>
    <PaperProvider theme={theme}>
        <App />
    </PaperProvider>
  </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
