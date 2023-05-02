import { View, Text,StyleSheet,Image,Button,TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Text as TextRN } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { addItem,deleteItem,deleteCart } from '../../reducers/features/cart/cartSlice'
import colors from '../../../colors'
const CartCard = ({c,product}) => {
    const dispatch=useDispatch()
    const navigation=useNavigation();
    const handleIncrease =(id)=>{
    dispatch(addItem(id))
  }
  const handleDecrease=(id)=>{
    dispatch(deleteItem(id))
  }
  return (
    <View style={styles.cartItem} key={c.id}>
                <View style={styles.top}>
                  <View style={styles.imgContainer}>
                        <Image source={{uri:product.image}} resizeMode='contain' style={styles.img} />
                    </View>
                    <View style={styles.details}>
                      <Text style={{color:colors.black,fontSize:18,fontWeight:700}} >{product.name} -{product.category}</Text>
                      <Text style={{color:colors.black,fontSize:18,fontWeight:600}}>{c.quantity}</Text>
                      <Text style={{color:colors.black,fontSize:18,fontWeight:500}}>₹{c.price}</Text>
                    </View> 
                </View>
               
                <View style={styles.middle}>
                  <View style={styles.buttonQuantity}>
                    <Text style={styles.quantityText}>Quantity-{c.quantityOfProducts}</Text>
                    <View style={{flexDirection:"row",gap:20}}>
                        <Button onPress={()=>handleIncrease(c.id)} color="green"  title="Add"/>
                        <Button onPress={()=>handleDecrease(c.id)} color="red" title="Remove"/>
                    </View>
                  </View>

                  <View style={styles.totolPrice}>
                      <View>
                        <TextRN variant='titleMedium'>Total Amount</TextRN>
                      </View>
                      <Text style={{color:colors.black,fontSize:24}}>₹{c.totalAmount}</Text>
                  </View>
              </View>

              <View style={styles.bottom}>
                  
             
                  <View>
                    <Button onPress={()=>navigation.push("MyTab",{screen:"SingleProduct",params:{id:c.product_id}})} color={colors.peacock} title="View Product"/>
                  </View>
                  <View>
                    <Button onPress={()=>dispatch(deleteCart(c.id))} color="red" title="Remove from cart"/>
                  </View>
                   </View >
              </View>
  )
}

export default CartCard

const styles = StyleSheet.create({
cartItem:{
   width:"100%",
   backgroundColor:colors.white,
   elevation:10,
   shadowColor:colors.black,
   padding:10,
   borderRadius:20,
   marginVertical:10
  },
  top:{
    flexDirection:"row",
    alignContent:"center"
  },
  imgContainer:{
    backgroundColor:colors.yellow,
    padding:3,
    width:"40%",
    height:100,
    borderRadius:12
  },img:{
    height:"100%",
    width:"100%",
  },
  details:{
    width:"60%",
    paddingHorizontal:24,
    paddingVertical:12
  },
  middle:{
    flexDirection:"row",
    alignItems:"center",
    borderBottomColor:colors.black,
    borderBottomWidth:1,
    marginBottom:6
  },
  buttonQuantity:{
    width:"60%",
    marginVertical:12,
  },
  quantityText:{
    fontSize:16,
    marginBottom:6 
  },
  totolPrice:{
    width:"40%"
  },
  bottom:{
    flexDirection:"row",
    gap:12
  }
})