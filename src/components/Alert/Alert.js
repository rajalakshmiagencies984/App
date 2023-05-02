import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import colors from '../../../colors'

const Alert = () => {
    const alerts = useSelector((state)=>(state.alert))
  
  return (
    <View style={styles.container}>
        {alerts?.map(a=>(
            <View style={styles.alertItem} key={a.id}>
                <Text style={styles.message}>{a.msg}</Text>
            </View> 
        ))}
        
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        justifyContent:"flex-end",
        alignItems:"center",
        zIndex:1001,
        bottom:67,
        width:"100%"
    },
    alertItem:{
        backgroundColor:"#495057",
        width:"90%",
        padding:16,
        zIndex:200222,
        borderRadius:12
    },
    message:{
        color:colors.white,
        fontSize:14,
        fontWeight:500
    }
})

export default Alert