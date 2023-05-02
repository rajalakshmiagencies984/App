import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import search from '../../assests/search.png'
import colors from '../../../colors'
import { useNavigation } from '@react-navigation/native'
const DummySearch = () => {
 const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.push('MyTab',{screen:"Search"})}>
        <View style={styles.searchBarContainer}>
            <View style={styles.imgContainer}>
                <Image source={search} style={styles.img} resizeMode='contain'  />
            </View>
            <View>
                <Text style={{color:colors.black,fontSize:16}}>Search Product</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        borderColor:colors.black,
        borderWidth:2,
        borderStyle:"solid",
        padding:6,
        borderTopLeftRadius:14,
        borderTopRightRadius:14
    },
    imgContainer:{
        height:32,
        width:32,
    },
    img:{
        width:"100%",
        height:"100%"
    },
    searchBarContainer:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:12,
        marginHorizontal:24
    }
})

export default DummySearch