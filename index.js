/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';

import { MD3LightTheme as DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './src/reducers/index'
import { StripeProvider} from '@stripe/stripe-react-native';
import { PUBLISHABLE_KEY } from './src/constants';
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
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <PaperProvider theme={theme}>
          <App />
      </PaperProvider>
    </StripeProvider>
  </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
