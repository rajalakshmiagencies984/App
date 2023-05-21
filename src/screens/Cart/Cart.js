import { View, Text,StyleSheet,Image,Button, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header/Header'
import { useSelector } from 'react-redux'
import { Text as TextRN,Button as ButtoRN } from 'react-native-paper'
import colors from '../../../colors'

import CartCard from '../../components/CartCard/CartCard'
const Cart = ({navigation}) => {
  const carts = useSelector((state)=>(state.cart))

  const products = useSelector((state)=>(state.product))

  const [total,setTotal]=React.useState(0)

  React.useEffect(()=>{
      const values = carts.map(c=> c.totalAmount)
      if(values.length>0){

        const value = values.reduce((a,b)=> a + b);
        setTotal(value)
      }
  },[carts])

  const handleSubmit=async()=>{

     navigation.push('PlaceOrder')
  }

  return (
    <View style={styles.container} >
      <Header />
      <TextRN variant="titleLarge" style={{margin:12}} >Cart</TextRN>
      <ScrollView style={{flex:1,backgroundColor:colors.white}}>

      <View style={styles.cartContainer}>

        {
          carts.map(c=>{
            let product = products.filter(p=> p._id==c.product_id)[0];
            return(
              <CartCard c={c} product={product} key={c.id} />
            )
          })
        }
      </View>
      </ScrollView>
      {total!=0 &&
      <View style={styles.bottomButton}>

          <ButtoRN onPress={handleSubmit} style={styles.btn}  mode="contained" >Place Order - Total Amount ₹{total} </ButtoRN>
      </View>
}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white
  },
  cartContainer:{
    width:"95%",
    justifyContent:"center",
    alignItems:"center",
    gap:12,
    marginHorizontal:12,

  },
  bottomButton:{
   position:"relative",
   bottom:1,
   margin:12
  },
  btn:{
    backgroundColor:colors.peacock
  }

})

export default Cart
