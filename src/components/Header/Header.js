import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import logo from '../../assests/logo'
import colors from '../../../colors'

const Header = () => {
  return (
    <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={{uri:logo}} style={styles.image} />
        </View>
        <View>
            <Text style={styles.brand}>Rajalakshmi Agencies</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:24,
        padding:12,
    },
    imgContainer:{
        height:48,
        width:48
    },
    image:{
        height:"100%",
        width:"100%",
        objectFit:"contain"
    },
    brand:{
        fontSize:24,
        color:colors.peacock,
        fontWeight:600
    }
})

export default Header