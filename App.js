import { SafeAreaView, Text,StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import AppNavigation from './src/screens/AppNavigation/AppNavigation'
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      
        <AppNavigation />
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#FFF"
  }
})

export default App