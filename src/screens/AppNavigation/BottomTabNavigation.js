
import {View,Image,Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../../../colors';
import Home from '../Home/Home';
import Account from '../Account/Account';
import home from '../../assests/home.png'
import account from '../../assests/account.png'
import cart from '../../assests/cart.png'
import history from '../../assests/orders.png'
import Cart from '../Cart/Cart';
import Orders from '../Orders/Orders';
import Products from '../Products/Products';
import SingleProduct from '../SingleProduct/SingleProduct';
import Search from '../Search/Search';
import SingleOrder from '../SingleOrder/SingleOrder';

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
        initialRouteName='Home'
       screenOptions={
        {
            headerShown: false,

            tabBarStyle:{

                position:"relative",
                bottom:0,
                left:0,
                right:0,
                elevation:0,
                backgroundColor:"#FFF",
                borderRadius:15,
                height:60,
                ...styles.shadow
            }

        }}

    >
      <Tab.Screen name="Home" component={Home}
        options={{
            tabBarIcon:({focused})=>(
                <View style={{alignItems:"center",justifyContent:"center"}}>
                    <Image
                        source={home}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:24,
                            tintColor:focused ? colors.black : colors.gray
                        }}
                    />

                </View>
            ),
            tabBarLabel:({focused})=>(
                <Text style={{color:focused?colors.black : colors.gray,fontSize:12,marginBottom:6}}>Home</Text>
            ),

        }}
      />
      <Tab.Screen name="History" component={Orders}

       options={{
            tabBarIcon:({focused})=>(
                <View style={{alignItems:"center",justifyContent:"center"}}>
                    <Image
                        source={history}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:24,
                            tintColor:focused ? colors.black : colors.gray
                        }}
                    />

                </View>
            ),
            tabBarLabel:({focused})=>(
                <Text style={{color:focused?colors.black : colors.gray,fontSize:12,marginBottom:6}}>Orders</Text>
            )
        }}
      />
      <Tab.Screen  name="Products" component={Products}

        options={{
            tabBarButton: () => null,
        }}
      />
       <Tab.Screen  name="SingleOrder" component={SingleOrder}

            options={{
                tabBarButton: () => null,
            }}
            />
      <Tab.Screen  name="Search" component={Search}

        options={{
            tabBarButton: () => null,
        }}
      />

      <Tab.Screen  name="SingleProduct" component={SingleProduct}

        options={{
            tabBarButton: () => null,
        }}
      />
      <Tab.Screen name="Cart" component={Cart}

       options={{
            tabBarIcon:({focused})=>(
                <View style={{alignItems:"center",justifyContent:"center"}}>
                    <Image
                        source={cart}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:24,
                            tintColor:focused ? colors.black : colors.gray
                        }}
                    />

                </View>
            ),
            tabBarLabel:({focused})=>(
                <Text style={{color:focused?colors.black : colors.gray,fontSize:12,marginBottom:6}}>Cart</Text>
            )
        }}
      />

      <Tab.Screen name="Account" component={Account}

       options={{
            tabBarIcon:({focused})=>(
                <View style={{alignItems:"center",justifyContent:"center"}}>
                    <Image
                        source={account}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:24,
                            tintColor:focused ? colors.black : colors.gray
                        }}
                    />

                </View>
            ),
            tabBarLabel:({focused})=>(
                <Text style={{color:focused?colors.black : colors.gray,fontSize:12,marginBottom:6}}>Account</Text>
            )
        }}
      />
    </Tab.Navigator>
  );
}

const styles=StyleSheet.create({
    shadow:{
        shadowColor:colors.gray,
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5,
    }
})

export default MyTabs;

