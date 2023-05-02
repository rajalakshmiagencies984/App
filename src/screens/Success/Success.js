import { View, Text,Image,StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Text as TextRn,Button, Dialog } from 'react-native-paper'
import img from '../../assests/success.png'
import { getUser } from '../../reducers/features/user/userSlice'
import colors from '../../../colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Success = () => {
    
    const user = useSelector((state)=>(state.user))
   
  return (
    <View style={styles.container}>
        <TextRn variant="titleLarge">Your account has created</TextRn>
        <Image source={img} style={styles.image}  />
        <Button style={styles.button} mode="contained">Welcome {user.name}</Button>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.yellow,
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        margin:24,
        height:48,
        width:48
    },
    button:{
        height:48,
        display:"flex",
        justifyContent:"center",
    }
})

export default Success