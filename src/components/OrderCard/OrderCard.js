import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../colors'
import moment from 'moment'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
const OrderCard = ({o_products,_id,totalAmount,status,orderedOn,paid,modeOfPayment}) => {

  const navigation = useNavigation();
  const handleNavigate = ()=>{
    navigation.push("MyTab",{screen:"SingleOrder",params:{id:_id,products:o_products}})
  }
  return (
    <View style={styles.container} >
        <Text>Total No Of Products : {o_products.length}</Text>
        <Text>Products</Text>
        <View style={{marginBottom:6}}>
            {o_products.map((o,idx)=>(
                <View key={idx}>
                            <Text>{o.name}</Text>
                </View>
            ))}
        </View>
        <Text>Total Amount : {totalAmount}</Text>
        <Text>Status:{status}</Text>
        <Text>Paid : {paid?"Paid":"Not Paid"}</Text>
        <Text>Mode Of Payment : {modeOfPayment}</Text>
        <Text>Ordered On : {moment(orderedOn).fromNow()}</Text>
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
        shadowOffsetColor:colors.white
    }
})

export default OrderCard
