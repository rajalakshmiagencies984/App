import { View, Text,Image,StyleSheet,Button,TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../../colors'
import back from '../../assests/back.png'
import { useDispatch } from 'react-redux'
import { addCart } from '../../reducers/features/cart/cartSlice'
import {v4 as uuidv4} from 'uuid'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SingleProductCard = ({product}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleSubmit = async(qty,amt)=>{
    let obj ={
      name:product.name,
      quantityOfProducts:1,
      id:uuidv4(),
      product_id:product._id,
      quantity:qty,
      price:amt,
      totalAmount:1*amt
    }
    
    const datas = await AsyncStorage.getItem("Cart");
    if(datas==null){
      await AsyncStorage.setItem("Cart",JSON.stringify([obj]))
    }else{
      const parsedData = JSON.parse(datas) 
      await AsyncStorage.removeItem("Cart")
      parsedData.push(obj)
      await AsyncStorage.setItem("Cart",JSON.stringify(parsedData))
      
    }
    dispatch(addCart(Object(obj)))
    navigation.replace("MyTab",{screen:"Cart"})
  }

  return (
    <View key={product._id}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.relativeContainer}>
          <Image source={back} style={styles.backImg} />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
            <Image source={{uri:product.image}} resizeMode='contain' style={styles.img}/>
        </View>
        <View style={styles.productNameDetails}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.category}>{product.category}</Text>
        </View>

        <Text style={styles.headerTitle}>
          Prices and quantity
        </Text>
        <View style={styles.container}>
          {product.prices.map(p=>(
            <View style={styles.priceItem} key={p._id}>
                <Text style={styles.quantity}>{p.quantity} - ₹{p.price}</Text>
                   <Button onPress={()=>handleSubmit(p.quantity,p.price)} color={colors.peacock}  title='Add to Cart' />
            </View>
          ))}
        </View>

        <Text style={styles.headerTitle}>
          Chemicals Used
        </Text>
        <View style={styles.container}>
            {product.chemicals.map(c=>(
              <View style={styles.chemicalItem} key={c._id}>
                  <Text style={styles.chemicalName}>{c.percentage} % of  {c.name.toUpperCase()}</Text>
              </View>
            ))}
        </View>
          
        <Text style={styles.headerTitle}>
          Products Can be Used For:
        </Text>
        <View style={styles.container}>
          {product.products.map(p=>(
            <View style={styles.productUsedItem} key={p._id}>
                <Text style={styles.productUsedName}>{p.name.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.headerTitle}>
            Effects 
        </Text>
        <View style={styles.container}>
              {product.effects.map(e=>(
                <View style={styles.effectItem} key={e._id}>
                    <Text style={styles.point}>{e.point}</Text>
                </View>
              ))}
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  relativeContainer:{
    position:"absolute",
    zIndex:100,
    left:10,
    top:10
  },
  backImg:{
    height:32,
    width:32
  },
  imageContainer:{
    width:"100%",
    backgroundColor:colors.yellow,
    padding:12
  },
  img:{
    height:200,
    width:"100%"
  },
  productNameDetails:{
    borderBottomColor:colors.black,
    borderBottomWidth:1
  },
  name:{
    marginHorizontal:24,
    marginVertical:6,
    fontSize:24,
    color:colors.black,
    fontWeight:"bold"
  },
  category:{
    marginHorizontal:24,
    fontSize:20,
    color:colors.black,
    fontWeight:600,
    marginBottom:6
  },
  headerTitle:{
    marginTop:12,
    marginHorizontal:12,
    fontSize:24,
    fontWeight:"bold"
  },
  container:{
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    flexWrap:"wrap",
    margin:12,
    gap:12
  },
  priceItem:{
    backgroundColor:colors.white,
    borderRadius:12,
    elevation:2,
    padding:6
  },
  quantity:{
    fontSize:18,
    letterSpacing:2,
    marginVertical:6
  },
 
  chemicalItem:{
    backgroundColor:colors.white,
    backgroundColor:colors.green,
    padding:12,
    borderRadius:12,
    elevation:10,
    shadowColor:colors.white
  },
  chemicalName:{
    fontSize:16,
    color:colors.white
  },
 productUsedItem:{
      backgroundColor:colors.yellow,
      padding:12,
      borderRadius:12,
      elevation:10,
      shadowColor:colors.white
 },
 productUsedName:{
  fontSize:16,
  color:colors.black
 },
 effectItem:{
  backgroundColor:colors.green,
  padding:12,
  borderRadius:12
 },
 point:{
  color:colors.white,
  fontSize:16,
 }

})

export default SingleProductCard