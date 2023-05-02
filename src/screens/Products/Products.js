import { View, Text,StyleSheet,ScrollView,Image, TouchableOpacity } from 'react-native'
import back from '../../assests/back.png'
import React from 'react'
import colors from '../../../colors'
import Header from '../../components/Header/Header'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
const Products = ({navigation,route}) => {
    const {params}=route
    const {category}=params
    const products = useSelector((state)=>(state.product))

    
  return (
    <ScrollView style={{flex:1}}>
        <View style={styles.container}>
              <Header/>
              <View style={styles.header}>
                  <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={back} style={styles.image} />
                  </TouchableOpacity>
                  <Text style={styles.category}>
                    {category}
                  </Text>
              </View>

              <View style={styles.productsList}>
                  {products.filter(p=> p.category==category).map(p=>(
                    <View style={styles.productItem} key={p._id}>
                        <View style={styles.imageContainer}>
                            <Image source={{uri:p.image}} resizeMode='contain' style={styles.img} />
                        </View>
                        <View style={styles.content}>
                          <Text style={styles.productName}>{p.name}</Text>
                          <Text style={styles.productCategory}>{p.category}</Text>
                          <View style={{width:"100%"}}>
                              <Button textColor='black' onPress={()=>navigation.push("MyTab",{screen:"SingleProduct",params:{id:p._id}})} style={styles.btn} mode="contained">View</Button>
                          </View>
                        </View> 
                    </View>
                  ))}
              </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white
  },
  header:{
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    gap:12,
    marginHorizontal:12
  },
  image:{
    height:32,
    width:32,
    objectFit:"contain"
  },
  category:{
    fontSize:18
  },
  productsList:{
    flexDirection:"row",
    flexWrap:"wrap",
  },
  productItem:{
    width:"50%",
    borderRightColor:colors.black,
    borderBottomColor:colors.black,
    borderRightWidth:1,
    borderBottomWidth:1,
    justifyContent:"center",
    alignItems:"center"
  },
  imageContainer:{
      height:100,
      width:100,
  },
  img:{
    height:"100%",
    width:"100%"
  },
  content:{
    gap:12,
    marginBottom:4,
    justifyContent:"center",
    alignItems:"center"
  },
  productName:{
    fontSize:18,
    fontWeight:700,
    color:colors.peacock
  },
  productCategory:{
    fontSize:16,
    fontWeight:500,
  },
  btn:{
    width:"100%",
    backgroundColor:colors.yellow
  }
})

export default Products