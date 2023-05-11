import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const HomeProducts = ({products,category}) => {
    const navigation = useNavigation();
  return (
    <View  style={[styles.container,{backgroundColor:category.background}]}>
            <Text style={[styles.title,{color:category.color}]}>{category.title}</Text>
            <View style={styles.productsList}>
                {products.map(p=>(
                    <View key={p._id} style={[styles.productItem,{backgroundColor:category.color}]}>
                        <View style={styles.imgContainer}>
                            <Image source={{uri:p.image}} style={styles.img} />
                        </View>
                        <View style={{justifyContent:"center",
                    alignItems:"center"}}>
                            <Text style={{color:category.background,fontSize:14,fontWeight:600}}>{p.name}</Text>
                            <Button onPress={()=>navigation.push('MyTab',{screen:"SingleProduct",params:{id:p._id}})} mode="oulined" textColor={category.background}>View</Button>
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.buttonContainer} >
                    <Button onPress={()=>navigation.push('MyTab',{screen:"Products",params:{category:category.title}})} textColor={category.background} style={{backgroundColor:category.color}} mode="contained">View All</Button>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width:"95%",
        marginBottom:10,
        padding:6,
        borderRadius:12,
    },
    title:{
        fontSize:24,
        marginVertical:6,
        padding:6
    },
    productsList:{
        flexDirection:'row',
        flexWrap:'wrap',
        gap:6
     },
    productItem:{
        width:"49%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:6
    },
    imgContainer:{
        height:100,
        width:80
    },
    img:{
        height:"100%",
        width:"100%",
        objectFit:"contain"
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:"flex-end",
        margin:12
    },


})

export default HomeProducts
