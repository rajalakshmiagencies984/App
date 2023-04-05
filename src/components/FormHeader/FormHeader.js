import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../colors'
import logo from '../../assests/logo'
const FormHeader = () => {
  return (
    <View style={styles.container}>
        <View style={styles.imgContainer}>
            <Image source={{uri:logo}} alt="form-header-logo" style={styles.img}  />
        </View>
        <Text style={styles.brand}>Rajalakshmi Agencies</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        gap:12
    },  
    imgContainer:{
        height:80,
        width:100
    },
    img:{
        height:"100%",
        width:"100%",
        objectFit:"contain"
    },
    brand:{
        color:colors.peacock,
        fontSize:24
    }
})

export default FormHeader