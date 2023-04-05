import { View, Text,StyleSheet } from 'react-native'
import { Image } from 'react-native'
import React,{useEffect} from 'react'
import colors from '../../../colors'
import logo from '../../assests/logo'


const Loading = ({navigation}) => {
  useEffect(()=>{
      setTimeout(()=>{
        navigation.replace("Login")
      },2000)
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
         <Image source={{uri:logo}} alt="Logo" style={styles.image}  />
      </View>
      <Text style={styles.brand}>Rajalakshmi Agencies</Text>
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
      color:colors.white,
      fontSize:32,
      fontStyle:"italic"
    }

})

export default Loading