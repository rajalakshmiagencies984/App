import { View,StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useSelector } from 'react-redux'
import colors from '../../../colors'


const Loading = () => {
 const loading  = useSelector((state)=>(state.loading))
  return (
    <>
    {loading.loading==true&&
        <View style={styles.container}>
         <ActivityIndicator size={'large'} animating={true} color={colors.peacock} />
     </View>
    }
    </>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:"absolute",
        backgroundColor:colors.black,
        opacity:0.6,
        justifyContent:"center",
        alignItems:"center",
        zIndex:1001,
        height:"100%",
        width:"100%"
    }
})

export default Loading