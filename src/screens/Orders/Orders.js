import { View, Text,StyleSheet, ScrollView,RefreshControl } from 'react-native'
import React from 'react'
import Header from '../../components/Header/Header'
import colors from '../../../colors'
import { useSelector,useDispatch } from 'react-redux'
import OrderCard from '../../components/OrderCard/OrderCard'
import { useState,useCallback } from 'react'
import { API_MyOrder } from '../../api'
import { setAlert,deleteAlert } from '../../reducers/features/alert/alertSlice'
import {v4 as uuidv4} from 'uuid'
import { setOrder } from '../../reducers/features/orders/orderSlice'
const Orders = ({navigation}) => {
  const orders = useSelector((state)=>(state.order))
  const products = useSelector((state)=>(state.product))
  const user = useSelector((state)=>(state.user))
  const [refreshing, setRefreshing] = useState(false);
  const dispatch=useDispatch();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const getData = async()=>{
      try{
        const {data}=await API_MyOrder({id:user._id})
        dispatch(setOrder(data))
        const id=uuidv4();
        dispatch(setAlert(Object({id,msg:"Reloaded"})))
        setTimeout(()=>{
            dispatch(deleteAlert(id))
            setRefreshing(false)
        },2000)
      }catch(e){
        const id=uuidv4();
        dispatch(setAlert(Object({id,msg:"Server Busy "})))
        setTimeout(()=>{
            dispatch(deleteAlert(id))
            setRefreshing(false)
        },2000)
      }
    }
    getData()
  }, []);
  return (
    <View style={styles.container}

    >
      <Header/>
      <Text style={{fontSize:24,padding:12,color:colors.black}}>Orders</Text>
      <ScrollView style={{flex:1,backgroundColor:colors.white}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
