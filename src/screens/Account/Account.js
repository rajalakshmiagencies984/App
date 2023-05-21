import {ScrollView, View,Text,StyleSheet,Linking } from 'react-native'
import React from 'react'
import Header from '../../components/Header/Header'
import colors from '../../../colors'
import { Avatar, Button } from 'react-native-paper'

import { useSelector } from 'react-redux'
import UserDetails from '../../components/UserDetails/UserDetails'
import Address from '../../components/Address/Address'
const Account = () => {
  const user = useSelector((state)=>(state.user))

  const goToUrl =()=>{
    Linking.openURL("https://rajalakshmi-agencies.vercel.app/")

  }


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

      <View style={{width:"100%",alignItems:"center",justifyContent:"center",flexDirection:"row",marginVertical:24}}>
        <Button mode="contained" onPress={()=>goToUrl()}> About us</Button>
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
