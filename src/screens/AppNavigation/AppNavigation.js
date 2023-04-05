import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from '../Loading/Loading';
import Login from '../Login/Login';
import Register from '../Register/Register';
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
 
  return (
    <NavigationContainer>
        <Stack.Navigator  screenOptions={{headerShown: false}} initialRouteName="Loading">
               <Stack.Screen name="Loading" component={Loading} />
               <Stack.Screen name="Login" component={Login} />
               <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation