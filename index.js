/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';

import { MD3LightTheme as DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';




export default function Main() {
    const theme= {
    ...DefaultTheme,
    colors: {
       ...DefaultTheme.colors,
        primary: '#212529',
        
  },
}
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
