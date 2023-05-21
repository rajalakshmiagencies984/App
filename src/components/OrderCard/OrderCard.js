import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../colors'
import moment from 'moment'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
const OrderCard = ({o_products,_id,totalAmount,status,orderedOn,deliveredOn,paid,modeOfPayment}) => {

  const navigation = useNavigation();
  const handleNavigate = ()=>{
    navigation.push("MyTab",{screen:"SingleOrder",params:{id:_id,products:o_products}})
  }
  return (
    <View style={styles.container} >
        <Text>Total No Of Products : {o_products.length}</Text>
        <Text>Total Amount : {totalAmount}</Text>
        <Text>Status:{status}</Text>
        <Text>Paid : {paid?"Paid":"Not Paid"}</Text>
        <Text>Mode Of Payment : {modeOfPayment}</Text>
        <Text>Ordered On : {moment(orderedOn).fromNow()}</Text>
        <Text>Delivered on :  {deliveredOn==null ? "Not Yet " :moment(deliveredOn).fromNow()}</Text>
        <Button onPress={handleNavigate} mode="contained" style={{marginVertical:12}}>View more Details</Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        borderRadius:24,
        padding:12,
        backgroundColor:colors.white,
        elevation:10,
        shadowOffsetColor:colors.white,
        gap:6
    }
})

export default OrderCard
