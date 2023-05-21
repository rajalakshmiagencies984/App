import { View, Text,StyleSheet,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import colors from '../../../colors'
import logo from '../../assests/logo'
import { ProgressBar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { API_getUser,API_MyOrder } from '../../api'

import { getCart } from '../../reducers/features/cart/cartSlice'
import { getUser } from '../../reducers/features/user/userSlice'
import { setOrder } from '../../reducers/features/orders/orderSlice'

const Loading = ({navigation}) => {
  const [progress,setProgress]=useState(0)
  const dispatch = useDispatch();

  const getOrder = async(id)=>{
    try{
    const {data}=await API_MyOrder({id})
    dispatch(setOrder(data))
    }catch(error){
      console.log(error.message)
    }
  }

  useEffect(()=>{
      const getToken = async()=>{
        setProgress(0.4)
        const token = await AsyncStorage.getItem("Agencies")
        setProgress(0.7)
        if(token==null){
          setProgress(1)
          navigation.replace("Login")
          return;
        }else{
          setProgress(1);
          const carts = await AsyncStorage.getItem("Cart");
          if(carts!=null){
            const parsedCart=JSON.parse(carts)

           dispatch(getCart(parsedCart))
          }
          const parsedToken = JSON.parse(token)
          const {_id}=parsedToken.user
          const {data}=await API_getUser({id:_id})
          dispatch(getUser(Object({...data})))
          getOrder(_id)
          navigation.replace("MyTab")
          return
        }


      }
      setTimeout(()=>{
        getToken()
      },500)
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
         <Image source={{uri:logo}} alt="Logo" style={styles.image}  />
      </View>
      <Text style={styles.brand}>Rajalakshmi Agencies</Text>
        <ProgressBar progress={progress} color={colors.green} style={styles.progress} />
    </View>
  )
}

const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.yellow,
        justifyContent:"center",
        alignItems:"center"
    },
    imgContainer:{
        height:225,
        width:125
    },
    image:{
      height:"100%",
      width:"100%",
      objectFit:"contain"
    },
    brand:{
      color:colors.peacock,
      fontSize:32,
      fontWeight:800,
      fontStyle:"italic"
    },
     progress:{
      height:6,
      marginVertical:12,
      width:300,
      backgroundColor:colors.yellow,
      opacity:0.5
    }

})

export default Loading
