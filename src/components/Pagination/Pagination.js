import { View, StyleSheet,Animated,Dimensions} from 'react-native'
import React, { startTransition } from 'react'

const {width}=Dimensions.get("screen")

const Pagination = ({data,scrollX,index}) => {
  return (
    <View style={styles.container}>
        {
            data.map((_,idx)=>{
                const inputRange =[(idx-1) * width, idx*width,(idx+1)*width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange:[12,30,12],
                    extrapolate:'clamp'
                })

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange:["#ccc","#FFF","#ccc"],
                    extrapolate:'clamp'
                })
                return <Animated.View key={idx.toString()} style={[styles.dot,{width:dotWidth,backgroundColor}]} />
        } )
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
            position:"relative",
            bottom:20,
            flexDirection:"row",
            width:"100%",
            alignItems:"center",
            justifyContent:"center"

    },
    dot:{
        width:12,
        height:12,
        borderRadius:6,
        backgroundColor:"#ccc",
        marginHorizontal:3
    },
    active:{
        backgroundColor:"#000"
    }
})


export default Pagination