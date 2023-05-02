import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import colors from '../../../colors'
import { useNavigation } from '@react-navigation/native'

const Address = ({user}) => {
  const navigation = useNavigation();
  
  return ( 
      <View style={styles.container}>
          <View style={styles.addressContainer}>
            {user.address.map(a=>(
              <View style={styles.item} key={a._id}>
                  <Text>{a.doorNo}</Text>
                  <Text>{a.street}</Text>
                  <Text>{a.city}</Text>
                  <Text>{a.pinCode}</Text>
              </View>
            ))}
          </View>
          {user.address.length <=2 &&
            <Button onPress={()=>navigation.push("AddAddress")} mode="contained">Add Address</Button>
          }
      </View>
  )
}

const styles = StyleSheet.create({
    container:{
      width:"90%",
      backgroundColor:colors.white,
      elevation:14,
      padding:12,
      borderRadius:20,
      marginBottom:12
      
    },
    addressContainer:{
      justifyContent:"center",
      gap:12,
      marginVertical:12,

    },
    item:{
      backgroundColor:colors.white,
      elevation:10,
      padding:10,
      borderRadius:12,
      padding:12
    }
})

export default Address

