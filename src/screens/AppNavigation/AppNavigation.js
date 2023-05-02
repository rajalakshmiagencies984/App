import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from '../Loading/Loading';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Success from '../Success/Success';
import AddAddress from '../../components/AddAddress/AddAddress';
import Otp from '../Otp/Otp';
const Stack = createNativeStackNavigator();
import MyTabs from './BottomTabNavigation';
import PlaceOrder from '../PlaceOrder/PlaceOrder';
const AppNavigation = () => {
 
  return (
    <NavigationContainer>
        <Stack.Navigator  screenOptions={{headerShown: false}} initialRouteName="Loading">
               <Stack.Screen name="Loading" component={Loading} />
               <Stack.Screen name="Login" component={Login} />
               <Stack.Screen name="Register" component={Register} />
               <Stack.Screen name="Otp" component={Otp}/>
               <Stack.Screen name="Success" component={Success}/>
               <Stack.Screen name="AddAddress" component={AddAddress}/>
               <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
               <Stack.Screen name="MyTab" component={MyTabs}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation