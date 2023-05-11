import { View, Text,StyleSheet,Image, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import colors from '../../../colors'
import { Button } from 'react-native-paper'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'
const SingleOrder = ({navigation,route}) => {
  const orders = useSelector((state)=>(state.order))
  const user = useSelector((state)=>(state.user))
  const {params}=route
  const {id,products}=params
  const [order,setOrder]=React.useState({})
  const [address,setAddress]=React.useState({})
  React.useLayoutEffect(()=>{
    const order = orders.filter(o=>o._id==id)[0]
    setOrder({...order})
    const address = user.address.filter(a=> a._id==order.address)[0]
    setAddress({...address})
  },[id,orders])




  return (
    <View style={styles.container}>
        <ScrollView style={{flex:1}}>
      <Text style={{fontSize:24,fontWeight:700}}>Products</Text>
      <View style={{padding:12,gap:12}}>
        {products.map((p,idx)=>(
            <View style={{flexDirection:"row",elevation:5,padding:12,alignItems:"center",backgroundColor:colors.white,borderRadius:12}} key={idx}>
                <View style={{width:"50%"}}>
                    <Image source={{uri:p.image}} alt="image" style={{width:"100%",height:100}} resizeMode='contain'/>
                </View>
                <View style={{width:"50%"}}>
                    <Text style={{margin:12}}>{p.name}</Text>
                    <Button mode="contained">View Product</Button>
                </View>
            </View>
        ))}
      </View>
    <Text>Total List</Text>
    <View>
        {orders.filter(o=> o._id==id)[0].products.map(p=>{
            const product = products.filter(p1=> p1._id==p.product_id)[0]
            const id = uuidv4()
            return(
                <View style={{flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                }} key={id} >
                    <View>
                        <Text>{product.name}</Text>
                    </View>
                    <View>
                        <Text>{p.quantityOfProducts} X {p.price} = {p.totalAmount}</Text>
                    </View>
                </View>
            )
        })}
    </View>

    <View style={{backgroundColor:"white",flexDirection:"row",justifyContent:"flex-end"}}>
        <View style={{marginHorizontal:12,marginBottom:10}}>
          <Text>Total - ₹{order.totalAmount}</Text>
        </View>
      </View>

        <View >
            <Text>Order Details</Text>
            <Text>Address : {address.doorNo} , {address.street} , {address.city} -{address.pinCode} </Text>
            <Text>Paid :  {order.paid ? "Paid":"Not Paid"}</Text>
            <Text>Mode Of Payment : {order.modeOfPayment}</Text>
            <Text>Status : {order.status}</Text>
            <Text>Ordered On : {moment(order.orderedOn).fromNow()}</Text>
            <Text>Delivery Status : {order.deliveryStatus?"Delivered":"Not Delivered"}</Text>
            <Text>{order.acceptedOn?"Accepted By Admin":"Waiting For acceptance By Admin"}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        margin:12
    }
})

export default SingleOrder
