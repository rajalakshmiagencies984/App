import {ScrollView, View,Text,StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/Header/Header'
import colors from '../../../colors'
import { Avatar } from 'react-native-paper'

import { useSelector } from 'react-redux'
import UserDetails from '../../components/UserDetails/UserDetails'
import Address from '../../components/Address/Address'
const Account = () => {
  const user = useSelector((state)=>(state.user))
  const orders = useSelector((state)=>(state.order))
  const carts = useSelector((state)=>(state.cart))

  return (
    <ScrollView style={{flex:1}}>
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View>
           <Avatar.Text size={48} label={user.name.charAt(0).toUpperCase()} />
        </View>
        <UserDetails user={user} />
        <Address user={user} />
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
  content:{
    justifyContent:"center",
    alignItems:"center",
    gap:18
  },
  name:{
    color:"gray",
    fontWeight:500,
    fontSize:18,
    textTransform:'capitalize'
  },
  
})

export default Account