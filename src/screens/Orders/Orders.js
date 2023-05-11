import { View, Text,StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header/Header'
import colors from '../../../colors'
import { useSelector } from 'react-redux'
import OrderCard from '../../components/OrderCard/OrderCard'
const Orders = ({navigation}) => {
  const orders = useSelector((state)=>(state.order))
  const products = useSelector((state)=>(state.product))
  return (
    <View style={styles.container}>
      <Header/>
      <Text style={{fontSize:24,padding:12,color:colors.black}}>Orders</Text>
      <ScrollView style={{flex:1,backgroundColor:colors.white}}>
        <View style={styles.ordersList}>
          {orders.map(o=>{
              var filteredOrderProductsArray=[]
              for(let i=0;i<o.products.length;i++){
                let orderedProductItem = o.products[i];
                let filterSingleProduct = products.filter(p=> p._id==orderedProductItem.product_id)
                filteredOrderProductsArray.push(filterSingleProduct[0])
              }
              return(
                <OrderCard {...o} key={o._id} o_products={filteredOrderProductsArray} />
              )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white
  },
  ordersList:{
    flexDirection:"column-reverse",
    padding:12,
    gap:12,
  }
})

export default Orders
